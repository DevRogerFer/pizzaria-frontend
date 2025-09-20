import Image from "next/image"
import Link from "next/link"
import styles from '../page.module.scss'
import logoImg from '/public/logo.svg'
import {api} from '@/services/api'
import {redirect} from 'next/navigation'

export default function Signup() {
    // diretiva para renderizar do lado servidor
    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        // validação simples
        if (name === "" || email === "" || password === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return;
        }

        // fazer a requisição e criar uma conta de usuário
        try {
            await api.post("/users", {
                name,
                email, 
                password
            })
        } catch(err) {
            console.log("Erro!")
            console.log(err)
        }

        // redirecionar o usuário para a página de login
        redirect("/")
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo da Pizzaria"
                />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            required
                            name="name"
                            placeholder="Digite seu nome..."
                            className={styles.input}
                        />
                        
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Digite seu e-mail..."
                            className={styles.input}
                        />                        

                        <input
                            type="password"
                            required
                            name="password"
                            placeholder="*****************"
                            className={styles.input}
                        /> 

                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>
                    </form>

                    <Link href="/" className={styles.text}>
                        Possui uma conta? Faça o login
                    </Link>
                </section>
            </div>
        </>
    )
}