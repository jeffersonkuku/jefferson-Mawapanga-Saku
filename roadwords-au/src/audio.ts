import type { AudioResolution } from './types'
import { getAudioCache, putAudioCache } from './storage'

const MISS_TTL = 1000 * 60 * 60 * 24 * 30

export function findAustralianAudioFilename(wikitext: string): string | null {
  const templates = wikitext.match(/\{\{audio\|en\|[^{}]+\}\}/gi) ?? []

  for (const template of templates) {
    const inner = template.slice(2, -2)
    const parts = inner.split('|').map((part) => part.trim())
    const file = parts[2] ?? ''
    const tail = parts.slice(3).join('|')

    const australianTag =
      /(^|\|)\s*(?:a\s*=\s*)?(?:AU|Australia|Australian)\s*(?:\||$)/i.test(tail)
    const australianName = /(^|[-_])au([-_]|\.)/i.test(file) || /^en-au-/i.test(file)

    if (file && (australianTag || australianName)) return file
  }

  const direct = wikitext.match(/\b(?:en|En)-au-[^|}\]\n]+\.(?:ogg|oga|wav|mp3)\b/i)
  return direct?.[0] ?? null
}

async function fetchWikitext(host: string, word: string): Promise<string | null> {
  const url =
    `https://${host}/w/api.php?action=parse&format=json&origin=*&prop=wikitext&page=` +
    encodeURIComponent(word)

  const response = await fetch(url, { cache: 'force-cache' })
  if (!response.ok) return null
  const data = await response.json()
  return data?.parse?.wikitext?.['*'] ?? null
}

async function findAudioFile(word: string): Promise<string | null> {
  for (const host of ['simple.wiktionary.org', 'en.wiktionary.org']) {
    try {
      const wikitext = await fetchWikitext(host, word)
      if (!wikitext) continue
      const filename = findAustralianAudioFilename(wikitext)
      if (filename) return filename
    } catch {
      // Try the next Wiktionary edition.
    }
  }
  return null
}

function plainText(value: string | undefined): string {
  if (!value) return ''
  const node = document.createElement('div')
  node.innerHTML = value
  return (node.textContent ?? '').trim()
}

async function resolveCommonsFile(word: string, fileName: string): Promise<AudioResolution | null> {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*' +
    '&prop=videoinfo&viprop=url%7Cderivatives%7Cextmetadata&titles=' +
    encodeURIComponent('File:' + fileName)

  const response = await fetch(url, { cache: 'force-cache' })
  if (!response.ok) return null
  const data = await response.json()
  const page = Object.values(data?.query?.pages ?? {})[0] as any
  const info = page?.videoinfo?.[0]
  if (!info) return null

  const derivatives: any[] = info.derivatives ?? []
  const mp3 = derivatives.find((d) => {
    const type = String(d.type ?? '').toLowerCase()
    const src = String(d.src ?? d.url ?? '').toLowerCase()
    return type.includes('mpeg') || type.includes('mp3') || src.endsWith('.mp3')
  })
  const playable = mp3 ?? derivatives.find((d) => String(d.type ?? '').startsWith('audio/'))
  const audioUrl = playable?.src ?? playable?.url ?? info.url
  if (!audioUrl) return null

  const meta = info.extmetadata ?? {}
  return {
    word,
    fileName,
    audioUrl,
    sourceUrl:
      info.descriptionurl ??
      'https://commons.wikimedia.org/wiki/' + encodeURIComponent('File:' + fileName),
    author: plainText(meta.Artist?.value ?? meta.Credit?.value) || 'Wikimedia Commons contributor',
    license: plainText(meta.LicenseShortName?.value) || 'See source',
  }
}

export async function resolveAustralianAudio(word: string): Promise<AudioResolution | null> {
  const key = word.trim().toLowerCase()
  const cached = await getAudioCache(key)

  if (cached?.status === 'ok' && cached.resolution) return cached.resolution
  if (cached?.status === 'miss' && Date.now() - cached.checkedAt < MISS_TTL) return null

  try {
    const fileName = await findAudioFile(key)
    if (!fileName) {
      await putAudioCache({ word: key, status: 'miss', checkedAt: Date.now() })
      return null
    }

    const resolution = await resolveCommonsFile(key, fileName)
    if (!resolution) {
      await putAudioCache({ word: key, status: 'miss', checkedAt: Date.now() })
      return null
    }

    await putAudioCache({
      word: key,
      status: 'ok',
      checkedAt: Date.now(),
      resolution,
    })
    return resolution
  } catch {
    return null
  }
}