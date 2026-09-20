import { describe, expect, it } from 'vitest'
import { applyReview, buildCandidatePool } from '../src/leitner'
import { DEFAULT_SETTINGS } from '../src/storage'
import type { WordCard } from '../src/types'

const card: WordCard = { id: 1, rank: 1, en: 'run', fr: 'courir' }

describe('Leitner engine adapted from Motamot', () => {
  it('promotes a recognized card', () => {
    const p = applyReview(undefined, card, 'recognized', DEFAULT_SETTINGS, new Date('2026-09-20T12:00:00Z'))
    expect(p.box).toBe(1)
    expect(p.yesCount).toBe(1)
  })

  it('resets a missed card to box zero', () => {
    const first = applyReview(undefined, card, 'recognized', DEFAULT_SETTINGS, new Date('2026-09-20T12:00:00Z'))
    const second = applyReview(first, card, 'notYet', DEFAULT_SETTINGS, new Date('2026-09-21T12:00:00Z'))
    expect(second.box).toBe(0)
    expect(second.noCount).toBe(1)
  })

  it('puts due cards ahead of fresh cards', () => {
    const cards: WordCard[] = [
      card,
      { id: 2, rank: 2, en: 'house', fr: 'maison' },
    ]
    const progress = [{
      wordId: 1,
      box: 1,
      nextReviewDate: '2026-09-19',
      lastSeenDate: '2026-09-18',
      yesCount: 1,
      noCount: 0,
      history: [{ date: '2026-09-18', result: 'recognized' as const }],
    }]
    const pool = buildCandidatePool(cards, progress, DEFAULT_SETTINGS, new Date('2026-09-20T12:00:00Z'))
    expect(pool[0].id).toBe(1)
  })
})
