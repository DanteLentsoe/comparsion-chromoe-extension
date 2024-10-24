import { describe, it, expect } from 'vitest'
import { isTextEmpty } from '../isTextEmpty'

describe('isTextEmpty', () => {
  it('returns true for empty string', () => {
    expect(isTextEmpty('')).toBe(true)
  })

  it('returns true for undefined', () => {
    expect(isTextEmpty((undefined as unknown) as string)).toBe(true)
  })

  it('returns true for null', () => {
    expect(isTextEmpty((null as unknown) as string)).toBe(true)
  })

  it('returns true for string with only spaces', () => {
    expect(isTextEmpty('   ')).toBe(true)
  })

  it('returns true for string with only tabs', () => {
    expect(isTextEmpty('\t\t\t')).toBe(true)
  })

  it('returns true for string with only newlines', () => {
    expect(isTextEmpty('\n\n\n')).toBe(true)
  })

  it('returns true for string with mixed whitespace', () => {
    expect(isTextEmpty('  \t \n  ')).toBe(true)
  })

  it('returns false for string with actual content', () => {
    expect(isTextEmpty('Hello')).toBe(false)
  })

  it('returns false for string with content and spaces', () => {
    expect(isTextEmpty('  Hello  ')).toBe(false)
  })

  it('returns false for string with numbers', () => {
    expect(isTextEmpty('123')).toBe(false)
  })

  it('returns false for string with special characters', () => {
    expect(isTextEmpty('!@#')).toBe(false)
  })

  // Edge cases
  it('returns false for string with zero', () => {
    expect(isTextEmpty('0')).toBe(false)
  })

  it('returns false for string with false', () => {
    expect(isTextEmpty('false')).toBe(false)
  })
})
