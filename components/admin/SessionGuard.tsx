'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAdminAction } from '@/app/admin/actions'

// Inactivity timeout: 30 minutes of no user interactions
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000
// Hard session timeout: 2 hours maximum session duration
const MAX_SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000

export function SessionGuard() {
  const router = useRouter()
  const lastActivityRef = useRef<number>(Date.now())
  const mountTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    // Record user activity
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart']
    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity, { passive: true })
    })

    // Check periodically for inactivity or maximum session expiry
    const interval = setInterval(async () => {
      const now = Date.now()
      const inactiveDuration = now - lastActivityRef.current
      const totalDuration = now - mountTimeRef.current

      if (inactiveDuration >= INACTIVITY_TIMEOUT_MS || totalDuration >= MAX_SESSION_TIMEOUT_MS) {
        clearInterval(interval)
        try {
          await logoutAdminAction()
        } catch {
          // If server action fails or client is disconnected, direct redirect
          router.push('/admin/login?reason=expired')
        }
      }
    }, 15000) // check every 15 seconds

    return () => {
      clearInterval(interval)
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity)
      })
    }
  }, [router])

  return null
}
