import { randomBytes } from 'crypto';

/**
 * Generates a valid base64 nonce value of at least 128-bits.
 *
 * @param {number} size The random bytes to generate clamped between 16 and 64.
 * Defaults to 16 (128-bit).
 *
 * @see https://csp.withgoogle.com/docs/faq.html#generating-nonces
 *
 * @returns {string} The base64 nonce value.
 */
export default function nonce(size = 16): string {
  const clamped = Math.max(16, Math.min(size, 64));
  const rounded = Math.round(clamped);

  return randomBytes(rounded).toString('base64');
}
