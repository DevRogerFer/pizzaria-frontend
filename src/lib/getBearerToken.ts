'use server'

import { cookies } from 'next/headers'

export async function getBearerToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  return token;
}
