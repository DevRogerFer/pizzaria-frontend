"use client"
import styles from './styles.module.scss'
import { useFormStatus } from 'react-dom'

interface Props {
    name: string
}

export function Button({ name }: Props) {
    const { pending } = useFormStatus();

    return (
        <button className={styles.button} type='submit' disabled={pending}>
            {pending ? 'Carregando...' : name}
        </button>
    )
}
