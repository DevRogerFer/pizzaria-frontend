'use server'

//import { getCookie } from "cookies-next"
import { cookies } from 'next/headers'
/*
export function getCookieClient() {
    const token = getCookie("session")
    return token;
}*/

export async function getCookieClient() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    return token || null;
}