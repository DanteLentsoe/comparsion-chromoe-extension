/**
 * Checks if a string is empty or contains only whitespace
 * @param text - The string to check
 * @returns boolean indicating if the string is empty or contains only whitespace
 */
export const isTextEmpty = (text: string): boolean => {
  return !text || text.trim().length === 0
}
