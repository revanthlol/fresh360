/**
 * Configuration helpers for site mode toggling
 */

export function isSinglePageMode(): boolean {
  return (
    process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true' ||
    process.env.SINGLE_PAGE_MODE === 'true'
  )
}
