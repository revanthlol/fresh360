'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { 
  ADMIN_COOKIE_NAME, 
  SESSION_MAX_AGE_SECONDS,
  verifyAdminCredentials, 
  createSessionToken, 
  getAdminSession 
} from '@/lib/admin-auth'
import { sanityWriteClient } from '@/lib/sanity'

export async function loginAdminAction(prevState: { error?: string } | null, formData: FormData) {
  const username = (formData.get('username') as string)?.trim() || ''
  const password = (formData.get('password') as string) || ''
  const redirectTo = (formData.get('redirectTo') as string) || '/admin'

  if (!username || !password) {
    return { error: 'Please enter both username and password.' }
  }

  const isValid = verifyAdminCredentials(username, password)

  if (!isValid) {
    return { error: 'Invalid admin credentials. Please try again.' }
  }

  const token = await createSessionToken(username)
  const cookieStore = await cookies()

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS, // 2 hours strict session timeout
  })

  redirect(redirectTo.startsWith('/admin') ? redirectTo : '/admin')
}

export async function logoutAdminAction() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  redirect('/admin/login')
}

export async function updateInquiryStatusAction(id: string, status: 'new' | 'contacted' | 'resolved' | string) {
  const session = await getAdminSession()
  if (!session.authenticated) {
    throw new Error('Unauthorized')
  }

  if (!sanityWriteClient) {
    throw new Error('Sanity write client unavailable')
  }

  await sanityWriteClient
    .patch(id)
    .set({ status })
    .commit()

  revalidatePath('/admin')
  return { success: true }
}

export const updateEnquiryStatusAction = updateInquiryStatusAction

export async function updateInquiryNotesAction(id: string, internalNotes: string) {
  const session = await getAdminSession()
  if (!session.authenticated) {
    throw new Error('Unauthorized')
  }

  if (!sanityWriteClient) {
    throw new Error('Sanity write client unavailable')
  }

  await sanityWriteClient
    .patch(id)
    .set({ internalNotes })
    .commit()

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteInquiryAction(id: string) {
  const session = await getAdminSession()
  if (!session.authenticated) {
    throw new Error('Unauthorized')
  }

  if (!sanityWriteClient) {
    throw new Error('Sanity write client unavailable')
  }

  await sanityWriteClient.delete(id)

  revalidatePath('/admin')
  return { success: true }
}

export const deleteEnquiryAction = deleteInquiryAction
