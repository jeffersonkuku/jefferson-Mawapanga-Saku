import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { AudioCacheEntry, Progress, Settings } from './types'

interface RoadWordsDB extends DBSchema {
  progress: {
    key: number
    value: Progress
  }
  audioCache: {
    key: string
    value: AudioCacheEntry
  }
  settings: {
    key: string
    value: Settings
  }
}

const DB_NAME = 'roadwords-au-db'
const DB_VERSION = 1

export const DEFAULT_SETTINGS: Settings = {
  sessionSize: 20,
  newCardsPerDay: 20,
  thinkSeconds: 5,
  repeats: 3,
  playbackRate: 1,
  retryMisses: true,
  voiceAnswers: true,
  boxIntervalsDays: [0, 1, 3, 7, 14, 30],
}

let dbPromise: Promise<IDBPDatabase<RoadWordsDB>> | undefined

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<RoadWordsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('progress', { keyPath: 'wordId' })
        db.createObjectStore('audioCache', { keyPath: 'word' })
        db.createObjectStore('settings')
      },
    })
  }
  return dbPromise
}

export async function getAllProgress(): Promise<Progress[]> {
  return (await getDb()).getAll('progress')
}

export async function putProgress(progress: Progress): Promise<void> {
  await (await getDb()).put('progress', progress)
}

export async function getAudioCache(word: string): Promise<AudioCacheEntry | undefined> {
  return (await getDb()).get('audioCache', word.toLowerCase())
}

export async function putAudioCache(entry: AudioCacheEntry): Promise<void> {
  await (await getDb()).put('audioCache', { ...entry, word: entry.word.toLowerCase() })
}

export async function getSettings(): Promise<Settings> {
  const db = await getDb()
  return (await db.get('settings', 'main')) ?? DEFAULT_SETTINGS
}

export async function putSettings(settings: Settings): Promise<void> {
  await (await getDb()).put('settings', settings, 'main')
}

export async function resetLearningData(): Promise<void> {
  const db = await getDb()
  const tx = db.transaction(['progress', 'audioCache'], 'readwrite')
  await Promise.all([tx.objectStore('progress').clear(), tx.objectStore('audioCache').clear()])
  await tx.done
}