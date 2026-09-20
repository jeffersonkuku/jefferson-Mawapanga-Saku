export interface WordCard {
  id: number
  rank: number
  en: string
  fr: string
}

export type ReviewResult = 'recognized' | 'notYet'

export interface Progress {
  wordId: number
  box: number
  nextReviewDate: string
  lastSeenDate: string
  yesCount: number
  noCount: number
  history: Array<{ date: string; result: ReviewResult }>
}

export interface Settings {
  sessionSize: number
  newCardsPerDay: number
  thinkSeconds: number
  repeats: number
  playbackRate: number
  retryMisses: boolean
  voiceAnswers: boolean
  boxIntervalsDays: number[]
}

export interface AudioResolution {
  word: string
  fileName: string
  audioUrl: string
  sourceUrl: string
  author: string
  license: string
}

export interface AudioCacheEntry {
  word: string
  status: 'ok' | 'miss'
  checkedAt: number
  resolution?: AudioResolution
}

export interface SessionCard {
  card: WordCard
  progress?: Progress
  audio: AudioResolution
}