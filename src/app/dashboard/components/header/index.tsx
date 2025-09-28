//"use client"

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logoImg from '/public/logo.svg'
import { LogOutIcon } from 'lucide-react'
// import { deleteCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { toast } from 'sonner'

export function Header() {
    //const router = useRouter();
    async function handleLogout() {
        'use server'
        //deleteCookie("session", { path: "/" })
        const cookieStore = await cookies();
        cookieStore.delete("session")
        //toast.success('Logout realizado com sucesso!')
        redirect("/")
        //router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt="Logo Pizzaria Reale"
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria                   
                    </Link>
                    <Link href="/dashboard/product">
                        Produto                   
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color="#FFF" />
                        </button>    
                    </form>                  
                </nav>
                
            </div>
        </header>
    )
}