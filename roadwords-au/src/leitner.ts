/**
 * Adapted from JulianGama/Motamot (MIT).
 * The box transition and due-card ordering are kept deliberately simple.
 */
import type { Progress, ReviewResult, Settings, WordCard } from './types'

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function applyReview(
  existing: Progress | undefined,
  card: WordCard,
  result: ReviewResult,
  settings: Settings,
  today: Date = new Date(),
): Progress {
  const currentBox = existing?.box ?? 0
  const maxBox = settings.boxIntervalsDays.length - 1
  const box = result === 'recognized' ? Math.min(currentBox + 1, maxBox) : 0
  const interval = settings.boxIntervalsDays[box] ?? settings.boxIntervalsDays[maxBox]
  const todayStr = toDateString(today)

  return {
    wordId: card.id,
    box,
    nextReviewDate: toDateString(addDays(today, interval)),
    lastSeenDate: todayStr,
    yesCount: (existing?.yesCount ?? 0) + (result === 'recognized' ? 1 : 0),
    noCount: (existing?.noCount ?? 0) + (result === 'notYet' ? 1 : 0),
    history: [...(existing?.history ?? []), { date: todayStr, result }],
  }
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildCandidatePool(
  cards: WordCard[],
  progress: Progress[],
  settings: Settings,
  today: Date = new Date(),
): WordCard[] {
  const todayStr = toDateString(today)
  const byId = new Map(progress.map((p) => [p.wordId, p]))
  const due: WordCard[] = []
  const fresh: WordCard[] = []
  const filler: WordCard[] = []
  let introducedToday = 0

  for (const card of cards) {
    const p = byId.get(card.id)
    if (!p) {
      fresh.push(card)
      continue
    }
    if (p.lastSeenDate === todayStr && p.history.length === 1) introducedToday += 1
    if (p.lastSeenDate === todayStr) continue
    if (p.nextReviewDate <= todayStr) due.push(card)
    else filler.push(card)
  }

  due.sort((a, b) => (byId.get(a.id)?.box ?? 0) - (byId.get(b.id)?.box ?? 0))
  fresh.sort((a, b) => a.rank - b.rank)
  filler.sort((a, b) =>
    (byId.get(a.id)?.nextReviewDate ?? '').localeCompare(byId.get(b.id)?.nextReviewDate ?? ''),
  )

  const budget = Math.max(0, settings.newCardsPerDay - introducedToday)
  return [...due, ...shuffle(fresh.slice(0, budget)), ...filler]
}