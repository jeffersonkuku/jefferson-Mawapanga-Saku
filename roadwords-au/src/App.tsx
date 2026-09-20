import { useEffect, useMemo, useRef, useState } from 'react'
import type { AudioResolution, Progress, SessionCard, Settings, WordCard } from './types'
import { applyReview } from './leitner'
import { prepareSession, type PrepareProgress } from './session'
import {
  DEFAULT_SETTINGS,
  getAllProgress,
  getSettings,
  putProgress,
  putSettings,
  resetLearningData,
} from './storage'
import { resolveAustralianAudio } from './audio'

type View = 'home' | 'settings' | 'preparing' | 'ready' | 'session' | 'finished'

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

function normalizeSpeech(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function App() {
  const [view, setView] = useState<View>('home')
  const [words, setWords] = useState<WordCard[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [sessionCards, setSessionCards] = useState<SessionCard[]>([])
  const [index, setIndex] = useState(0)
  const [prep, setPrep] = useState<PrepareProgress>({ checked: 0, found: 0, target: 0 })
  const [phase, setPhase] = useState('Prêt')
  const [countdown, setCountdown] = useState('•')
  const [revealed, setRevealed] = useState(false)
  const [answerVisible, setAnswerVisible] = useState(false)
  const [micStatus, setMicStatus] = useState('')
  const [needsTap, setNeedsTap] = useState(false)
  const [error, setError] = useState('')
  const [testAudio, setTestAudio] = useState<AudioResolution | null>(null)
  const [testStatus, setTestStatus] = useState('Test non lancé')

  const playerRef = useRef<HTMLAudioElement | null>(null)
  const cardsRef = useRef<SessionCard[]>([])
  const runToken = useRef(0)
  const recognitionRef = useRef<any>(null)
  const wakeLockRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('./words-3000.json', { cache: 'force-cache' }).then((r) => {
        if (!r.ok) throw new Error('Impossible de charger les 3000 mots.')
        return r.json() as Promise<WordCard[]>
      }),
      getAllProgress(),
      getSettings(),
    ])
      .then(([loadedWords, loadedProgress, loadedSettings]) => {
        if (cancelled) return
        setWords(loadedWords)
        setProgress(loadedProgress)
        setSettings(loadedSettings)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })

    return () => {
      cancelled = true
      stopRecognition()
      playerRef.current?.pause()
    }
  }, [])

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    let seen = 0
    let mastered = 0
    let due = 0
    for (const p of progress) {
      seen += 1
      if (p.box >= settings.boxIntervalsDays.length - 1) mastered += 1
      if (p.nextReviewDate <= today) due += 1
    }
    return { seen, mastered, due }
  }, [progress, settings.boxIntervalsDays.length])

  const current = sessionCards[index]

  function stopRecognition() {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.onend = null
      recognitionRef.current.abort()
    } catch {
      // no-op
    }
    recognitionRef.current = null
  }

  async function saveSettings(next: Settings) {
    setSettings(next)
    await putSettings(next)
  }

  async function playAudio(url: string): Promise<boolean> {
    const audio = playerRef.current
    if (!audio) return false

    return new Promise<boolean>((resolve) => {
      let settled = false
      const finish = (ok: boolean) => {
        if (settled) return
        settled = true
        audio.onended = null
        audio.onerror = null
        resolve(ok)
      }

      try {
        audio.pause()
        audio.src = url
        audio.playbackRate = settings.playbackRate
        audio.currentTime = 0
        audio.onended = () => finish(true)
        audio.onerror = () => finish(false)
        const promise = audio.play()
        promise?.catch(() => finish(false))
      } catch {
        finish(false)
      }
    })
  }

  async function runCardAt(cardIndex: number, token: number) {
    const card = cardsRef.current[cardIndex]
    if (!card || token !== runToken.current) return

    stopRecognition()
    setIndex(cardIndex)
    setRevealed(false)
    setAnswerVisible(false)
    setNeedsTap(false)
    setMicStatus('')
    setPhase('Écoute')
    setCountdown('▶')

    const firstPlayed = await playAudio(card.audio.audioUrl)
    if (token !== runToken.current) return
    if (!firstPlayed) {
      setPhase('Audio prêt')
      setNeedsTap(true)
      setMicStatus('iPhone a bloqué la lecture automatique. Appuie sur Continuer.')
      return
    }

    setPhase('Réfléchis')
    for (let second = settings.thinkSeconds; second > 0; second -= 1) {
      if (token !== runToken.current) return
      setCountdown(String(second))
      await delay(1000)
    }

    if (token !== runToken.current) return
    setCountdown('✓')
    setPhase('Réponse')
    setRevealed(true)

    await delay(350)

    for (let repeat = 0; repeat < settings.repeats; repeat += 1) {
      if (token !== runToken.current) return
      const repeated = await playAudio(card.audio.audioUrl)
      if (!repeated) {
        setNeedsTap(true)
        setMicStatus('Lecture bloquée. Appuie sur Continuer pour reprendre cette carte.')
        return
      }
      if (repeat < settings.repeats - 1) await delay(500)
    }

    if (token !== runToken.current) return
    setPhase('Tu connaissais ?')
    setAnswerVisible(true)
    setMicStatus(settings.voiceAnswers ? '🎙️ Dis « oui » ou « non »' : 'Choisis OUI ou NON')
    if (settings.voiceAnswers) startRecognition(token)
  }

  function startRecognition(token: number) {
    stopRecognition()
    const Recognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!Recognition) {
      setMicStatus('Micro non disponible dans ce navigateur — utilise les boutons.')
      return
    }

    try {
      const recognition = new Recognition()
      recognitionRef.current = recognition
      recognition.lang = 'fr-FR'
      recognition.continuous = false
      recognition.interimResults = false
      recognition.maxAlternatives = 5

      recognition.onresult = (event: any) => {
        if (token !== runToken.current) return
        const heard = normalizeSpeech(
          Array.from(event.results)
            .flatMap((result: any) => Array.from(result))
            .map((alt: any) => alt.transcript)
            .join(' '),
        )
        if (/\b(oui|ouais|yes|yep)\b/.test(heard)) void answer('recognized')
        else if (/\b(non|no|nope)\b/.test(heard)) void answer('notYet')
        else setMicStatus('Pas compris. Dis « oui » ou « non », ou utilise les boutons.')
      }

      recognition.onerror = () => {
        setMicStatus('Micro indisponible — utilise les boutons.')
      }

      recognition.start()
    } catch {
      setMicStatus('Micro indisponible — utilise les boutons.')
    }
  }

  async function prepare() {
    if (!words.length) return
    setError('')
    setPrep({ checked: 0, found: 0, target: settings.sessionSize })
    setView('preparing')

    const cards = await prepareSession(words, progress, settings, setPrep)
    if (!cards.length) {
      setError(
        'Aucun enregistrement australien n’a été trouvé dans les premiers mots proposés. Réessaie avec une connexion internet active.',
      )
      setView('home')
      return
    }

    cardsRef.current = cards
    setSessionCards(cards)
    setIndex(0)
    setView('ready')

    const player = playerRef.current
    if (player && cards[0]) {
      player.src = cards[0].audio.audioUrl
      player.preload = 'auto'
      player.load()
    }
  }

  async function beginSession() {
    if (!cardsRef.current.length) return
    runToken.current += 1
    const token = runToken.current
    setView('session')

    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
      }
    } catch {
      // Wake lock is optional.
    }

    // Called directly from the user's tap. The first HTMLAudioElement.play()
    // therefore happens inside the iPhone user gesture.
    void runCardAt(0, token)
  }

  async function answer(result: 'recognized' | 'notYet') {
    const card = cardsRef.current[index]
    if (!card || !answerVisible) return

    stopRecognition()
    setAnswerVisible(false)
    setMicStatus(result === 'recognized' ? '✅ Oui' : '↩️ Non')

    const existing = progress.find((p) => p.wordId === card.card.id)
    const updated = applyReview(existing, card.card, result, settings)
    await putProgress(updated)

    setProgress((previous) => {
      const others = previous.filter((p) => p.wordId !== updated.wordId)
      return [...others, updated]
    })

    let nextCards = [...cardsRef.current]
    if (result === 'notYet' && settings.retryMisses) {
      const retry: SessionCard = { ...card, progress: updated }
      const retryAt = Math.min(nextCards.length, index + 4)
      nextCards.splice(retryAt, 0, retry)
      cardsRef.current = nextCards
      setSessionCards(nextCards)
    }

    await delay(500)
    const nextIndex = index + 1
    if (nextIndex >= nextCards.length) {
      await finishSession()
      setView('finished')
      return
    }

    runToken.current += 1
    void runCardAt(nextIndex, runToken.current)
  }

  async function finishSession() {
    runToken.current += 1
    stopRecognition()
    playerRef.current?.pause()
    try {
      await wakeLockRef.current?.release?.()
    } catch {
      // no-op
    }
    wakeLockRef.current = null
  }

  async function leaveSession() {
    await finishSession()
    setView('home')
  }

  async function testRealAudio() {
    setTestStatus('Recherche du vrai enregistrement australien de « run »…')
    const resolved = await resolveAustralianAudio('run')
    if (!resolved) {
      setTestStatus('❌ Aucun audio australien trouvé pour le test.')
      return
    }

    setTestAudio(resolved)
    setTestStatus('▶ Lecture : run — vrai fichier australien Wikimedia')
    const ok = await playAudio(resolved.audioUrl)
    setTestStatus(ok ? '✅ Test audio terminé.' : '⚠️ iPhone a bloqué la lecture. Appuie encore sur Tester.')
  }

  async function resetAll() {
    if (!window.confirm('Effacer la progression et le cache audio ?')) return
    await resetLearningData()
    setProgress([])
    setTestAudio(null)
    setTestStatus('Progression réinitialisée.')
  }

  const settingsForm = (
    <div className="settings-grid">
      <label>
        Temps pour réfléchir
        <select
          value={settings.thinkSeconds}
          onChange={(e) => void saveSettings({ ...settings, thinkSeconds: Number(e.target.value) })}
        >
          {[3, 5, 7, 10].map((value) => (
            <option key={value} value={value}>
              {value} secondes
            </option>
          ))}
        </select>
      </label>

      <label>
        Répétitions après la réponse
        <select
          value={settings.repeats}
          onChange={(e) => void saveSettings({ ...settings, repeats: Number(e.target.value) })}
        >
          {[2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} fois
            </option>
          ))}
        </select>
      </label>

      <label>
        Mots par session
        <select
          value={settings.sessionSize}
          onChange={(e) =>
            void saveSettings({
              ...settings,
              sessionSize: Number(e.target.value),
              newCardsPerDay: Number(e.target.value),
            })
          }
        >
          {[10, 20, 30, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label>
        Vitesse du vrai enregistrement
        <select
          value={settings.playbackRate}
          onChange={(e) => void saveSettings({ ...settings, playbackRate: Number(e.target.value) })}
        >
          <option value={0.85}>0,85× entraînement</option>
          <option value={1}>1× naturelle</option>
        </select>
      </label>

      <label className="toggle-row">
        <span>🎙️ Réponse vocale oui / non</span>
        <input
          type="checkbox"
          checked={settings.voiceAnswers}
          onChange={(e) => void saveSettings({ ...settings, voiceAnswers: e.target.checked })}
        />
      </label>

      <label className="toggle-row">
        <span>🔁 Revoir les erreurs dans la même session</span>
        <input
          type="checkbox"
          checked={settings.retryMisses}
          onChange={(e) => void saveSettings({ ...settings, retryMisses: e.target.checked })}
        />
      </label>
    </div>
  )

  return (
    <div className="app-shell">
      <audio ref={playerRef} playsInline preload="auto" />

      <header className="topbar">
        <button className="icon-button" onClick={() => void leaveSession()} aria-label="Accueil">
          ⌂
        </button>
        <div className="brand">
          <span>AU</span> RoadWords
        </div>
        <button
          className="icon-button"
          onClick={() => {
            void finishSession()
            setView('settings')
          }}
          aria-label="Réglages"
        >
          ⚙
        </button>
      </header>

      {view === 'home' && (
        <main>
          <section className="hero">
            <div className="badge">🇦🇺 REAL HUMAN AUDIO</div>
            <h1>Écoute.<br />Comprends.<br />Retient.</h1>
            <p>
              Adapté du projet open-source Motamot : PWA mobile + Leitner. Ici les cartes
              utilisent de vrais enregistrements australiens de Wiktionary/Wikimedia.
            </p>
          </section>

          {error && <div className="error-box">{error}</div>}

          <button className="primary big" onClick={() => void prepare()} disabled={!words.length}>
            🎧 Préparer ma session
          </button>

          <div className="stats">
            <div><strong>{stats.seen}</strong><span>vus</span></div>
            <div><strong>{stats.mastered}</strong><span>maîtrisés</span></div>
            <div><strong>{stats.due}</strong><span>à revoir</span></div>
          </div>

          <section className="panel">
            <h3>Test du vrai audio</h3>
            <p>{testStatus}</p>
            <button className="secondary" onClick={() => void testRealAudio()}>
              🔊 Tester « run »
            </button>
            {testAudio && (
              <a className="source-link" href={testAudio.sourceUrl} target="_blank" rel="noreferrer">
                Source : {testAudio.fileName} • {testAudio.license}
              </a>
            )}
          </section>

          <section className="car-note">
            <strong>🚗 Pour la voiture</strong>
            <p>
              Prépare la session et lance le premier mot à l’arrêt. Ensuite l’app enchaîne les
              audios ; tu peux répondre « oui » ou « non » au micro quand Safari l’autorise.
            </p>
          </section>
        </main>
      )}

      {view === 'settings' && (
        <main>
          <h2>Réglages</h2>
          <section className="panel">
            <p className="tiny">
              Les mots anglais ne passent pas par une voix TTS. L’app cherche une prononciation
              australienne enregistrée sur Wiktionary/Wikimedia et ignore les mots sans audio AU.
            </p>
            {settingsForm}
          </section>
          <button className="secondary full" onClick={() => void testRealAudio()}>
            🔊 Tester le moteur audio
          </button>
          <button className="danger full" onClick={() => void resetAll()}>
            Réinitialiser progression + cache audio
          </button>
        </main>
      )}

      {view === 'preparing' && (
        <main className="center-screen">
          <div className="spinner" />
          <h2>Préparation</h2>
          <p>Je cherche uniquement de vrais enregistrements australiens.</p>
          <div className="progress-bar">
            <div
              style={{
                width: `${Math.min(100, (prep.found / Math.max(1, prep.target)) * 100)}%`,
              }}
            />
          </div>
          <strong>{prep.found} / {prep.target} audios trouvés</strong>
          <span className="tiny">{prep.checked} mots vérifiés</span>
        </main>
      )}

      {view === 'ready' && (
        <main className="center-screen">
          <div className="headphones">🎧</div>
          <h2>{sessionCards.length} vrais audios prêts</h2>
          <p>
            Le premier son ne part pas tout seul : ton toucher ci-dessous autorise l’audio sur
            iPhone. Ensuite la session s’enchaîne.
          </p>
          <button className="primary big" onClick={() => void beginSession()}>
            ▶ Écouter le 1er mot et démarrer
          </button>
          <button className="ghost full" onClick={() => setView('home')}>
            Annuler
          </button>
        </main>
      )}

      {view === 'session' && current && (
        <main className="session-screen">
          <div className="session-meta">
            <span>{index + 1} / {sessionCards.length}</span>
            <span>Boîte {current.progress?.box ?? 0}</span>
          </div>

          <section className="study-stage">
            <div className="phase">{phase}</div>
            <div className="countdown">{countdown}</div>
            <div className={revealed ? 'word visible' : 'word hidden-word'}>{current.card.en}</div>
            <div className={revealed ? 'translation visible' : 'translation hidden-word'}>
              {current.card.fr}
            </div>

            {revealed && (
              <a className="source-link" href={current.audio.sourceUrl} target="_blank" rel="noreferrer">
                🎙️ {current.audio.fileName} • {current.audio.license}
              </a>
            )}

            {needsTap && (
              <button
                className="primary continue-button"
                onClick={() => {
                  runToken.current += 1
                  void runCardAt(index, runToken.current)
                }}
              >
                ▶ Continuer l’audio
              </button>
            )}
          </section>

          {answerVisible && (
            <section className="answer-zone">
              <h3>Tu connaissais ce mot ?</h3>
              <p>{micStatus}</p>
              <div className="answer-grid">
                <button className="answer no" onClick={() => void answer('notYet')}>
                  NON <span>à revoir</span>
                </button>
                <button className="answer yes" onClick={() => void answer('recognized')}>
                  OUI <span>connu</span>
                </button>
              </div>
            </section>
          )}

          <button className="ghost full" onClick={() => void leaveSession()}>
            Terminer
          </button>
        </main>
      )}

      {view === 'finished' && (
        <main className="center-screen">
          <div className="headphones">✓</div>
          <h2>Session terminée</h2>
          <p>Ta progression Leitner a été sauvegardée sur ce téléphone.</p>
          <button className="primary big" onClick={() => setView('home')}>
            Retour à l’accueil
          </button>
        </main>
      )}
    </div>
  )
}

export default App
