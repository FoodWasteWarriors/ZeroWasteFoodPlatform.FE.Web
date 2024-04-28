/**
 * Capitalizes the first letters of a string.
 * @param str - The input string.
 * @returns The string with the first letter of each word capitalized.
 */
export function capitalizeFirstLetters(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Reverses a string.
 * @param str - The input string.
 * @returns The reversed string.
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
}
