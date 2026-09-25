import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'fresh360_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

/**
 * Retrieves the server-side signing secret.
 * Fails closed by throwing if no secret/password is configured in environment variables.
 */
function getSecretKey(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('CRITICAL: ADMIN_PASSWORD or ADMIN_SESSION_SECRET environment variable is missing. Failing closed.')
  }
  return secret
}

// Convert ArrayBuffer to Hex string
function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function computeHmac(message: string, keyStr: string): Promise<string> {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(keyStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message))
  return bufToHex(signature)
}

/**
 * Validates admin credentials against server-side environment variables.
 * Strictly fails closed if environment variables are missing.
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USER || process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPass) {
    console.error('[Security] ADMIN_USER or ADMIN_PASSWORD is not configured in environment variables. Failing closed.')
    return false
  }

  // Constant-time length check and character check to prevent timing attacks
  if (username.length !== expectedUser.length || password.length !== expectedPass.length) {
    return false
  }

  let userMatch = true
  for (let i = 0; i < username.length; i++) {
    if (username[i] !== expectedUser[i]) userMatch = false
  }

  let passMatch = true
  for (let i = 0; i < password.length; i++) {
    if (password[i] !== expectedPass[i]) passMatch = false
  }

  return userMatch && passMatch
}

/**
 * Creates a signed session token: username:timestamp:hmac
 */
export async function createSessionToken(username: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000)
  const payload = `${username}:${timestamp}`
  const hmac = await computeHmac(payload, getSecretKey())
  return `${payload}:${hmac}`
}

/**
 * Verifies a session token string.
 * Fails closed if token is invalid, expired, or signing key is missing.
 */
export async function verifySessionToken(token: string | null | undefined): Promise<{ valid: boolean; user?: string }> {
  if (!token) return { valid: false }

  const parts = token.split(':')
  if (parts.length !== 3) return { valid: false }

  const [user, tsStr, signature] = parts
  const timestamp = parseInt(tsStr, 10)
  if (isNaN(timestamp)) return { valid: false }

  // Check expiration (7 days) and future skew limit (5 mins)
  const now = Math.floor(Date.now() / 1000)
  if (now - timestamp > SESSION_MAX_AGE_SECONDS || timestamp > now + 300) {
    return { valid: false }
  }

  try {
    const payload = `${user}:${timestamp}`
    const expectedHmac = await computeHmac(payload, getSecretKey())

    if (signature !== expectedHmac) {
      return { valid: false }
    }

    return { valid: true, user }
  } catch (err) {
    console.error('[Security] Session verification error (failing closed):', err)
    return { valid: false }
  }
}

/**
 * Server-side check for admin authentication in App Router Server Components / Actions
 */
export async function getAdminSession(): Promise<{ authenticated: boolean; user?: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    const session = await verifySessionToken(token)
    return { authenticated: session.valid, user: session.user }
  } catch {
    return { authenticated: false }
  }
}
