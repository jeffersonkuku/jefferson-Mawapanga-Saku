import type { Progress, SessionCard, Settings, WordCard } from './types'
import { buildCandidatePool } from './leitner'
import { resolveAustralianAudio } from './audio'

export interface PrepareProgress {
  checked: number
  found: number
  target: number
}

export async function prepareSession(
  cards: WordCard[],
  progress: Progress[],
  settings: Settings,
  onProgress?: (progress: PrepareProgress) => void,
): Promise<SessionCard[]> {
  const pool = buildCandidatePool(cards, progress, settings)
  const result: SessionCard[] = []
  const maxCandidates = Math.min(pool.length, Math.max(settings.sessionSize * 10, 80))
  const concurrency = 5
  let checked = 0

  for (let start = 0; start < maxCandidates && result.length < settings.sessionSize; start += concurrency) {
    const batch = pool.slice(start, Math.min(start + concurrency, maxCandidates))
    const resolved = await Promise.all(
      batch.map(async (card) => ({
        card,
        audio: await resolveAustralianAudio(card.en),
      })),
    )

    for (const item of resolved) {
      checked += 1
      if (item.audio && result.length < settings.sessionSize) {
        result.push({
          card: item.card,
          progress: progress.find((p) => p.wordId === item.card.id),
          audio: item.audio,
        })
      }
      onProgress?.({ checked, found: result.length, target: settings.sessionSize })
    }
  }

  return result
}