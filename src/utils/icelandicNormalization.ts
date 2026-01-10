/**
 * Icelandic Character Normalization Utility
 *
 * Provides bidirectional normalization for Icelandic characters,
 * allowing users to search with either standard ASCII or Icelandic characters
 * and get matching results.
 */

// Mapping of Icelandic characters to their ASCII equivalents
const icelandicToAscii: Record<string, string> = {
  // Lowercase
  'á': 'a',
  'ð': 'd',
  'é': 'e',
  'í': 'i',
  'ó': 'o',
  'ú': 'u',
  'ý': 'y',
  'þ': 'th',
  'æ': 'ae',
  'ö': 'o',
  // Uppercase
  'Á': 'A',
  'Ð': 'D',
  'É': 'E',
  'Í': 'I',
  'Ó': 'O',
  'Ú': 'U',
  'Ý': 'Y',
  'Þ': 'Th',
  'Æ': 'Ae',
  'Ö': 'O',
};

/**
 * Normalize Icelandic characters to ASCII equivalents
 * @param text - The text to normalize
 * @returns The normalized text with Icelandic characters replaced
 */
export function normalizeIcelandic(text: string): string {
  if (!text) return '';

  let result = text;
  for (const [icelandic, ascii] of Object.entries(icelandicToAscii)) {
    result = result.split(icelandic).join(ascii);
  }
  return result;
}

/**
 * Create a search-friendly version of text that can match both
 * Icelandic and ASCII versions
 * @param text - The text to normalize for search
 * @returns Lowercase normalized text
 */
export function normalizeForSearch(text: string): string {
  return normalizeIcelandic(text).toLowerCase();
}

/**
 * Client-side JavaScript version of the normalization function
 * This string can be injected into client-side scripts
 */
export const clientNormalizationScript = `
// Icelandic character normalization
const icelandicToAscii = {
  'á': 'a', 'ð': 'd', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ý': 'y',
  'þ': 'th', 'æ': 'ae', 'ö': 'o',
  'Á': 'A', 'Ð': 'D', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ý': 'Y',
  'Þ': 'Th', 'Æ': 'Ae', 'Ö': 'O'
};

function normalizeIcelandic(text) {
  if (!text) return '';
  let result = text;
  for (const [icelandic, ascii] of Object.entries(icelandicToAscii)) {
    result = result.split(icelandic).join(ascii);
  }
  return result;
}

function normalizeForSearch(text) {
  return normalizeIcelandic(text).toLowerCase();
}
`;
