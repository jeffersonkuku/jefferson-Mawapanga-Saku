import { describe, expect, it } from 'vitest'
import { findAustralianAudioFilename } from '../src/audio'

describe('Australian Wiktionary audio parser', () => {
  it('finds an AU-tagged audio template', () => {
    expect(
      findAustralianAudioFilename('{{audio|en|en-au-run.ogg|a=AU}}'),
    ).toBe('en-au-run.ogg')
  })

  it('finds an Australia-labelled recording', () => {
    expect(
      findAustralianAudioFilename('{{audio|en|Example-word.ogg|Australia}}'),
    ).toBe('Example-word.ogg')
  })

  it('rejects US-only audio', () => {
    expect(
      findAustralianAudioFilename('{{audio|en|en-us-run.ogg|a=US}}'),
    ).toBeNull()
  })

  it('accepts direct En-au filenames found elsewhere in wikitext', () => {
    expect(findAustralianAudioFilename('text En-au-house.ogg more text')).toBe(
      'En-au-house.ogg',
    )
  })
})
