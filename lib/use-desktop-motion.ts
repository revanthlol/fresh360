'use client'

import { useSyncExternalStore } from 'react'

const query = '(min-width: 64rem) and (min-height: 46rem) and (prefers-reduced-motion: no-preference)'
const subscribe = (onChange: () => void) => {
  const preference = window.matchMedia(query)
  preference.addEventListener('change', onChange)
  return () => preference.removeEventListener('change', onChange)
}
const snapshot = () => window.matchMedia(query).matches
const serverSnapshot = () => false

export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot)
}
