'use client'
import { ChangeEvent, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { getCookieClient } from '@/lib/cookieClient'
import Cookies from 'js-cookie';
import { getBearerToken } from '@/lib/getBearerToken'

interface CategoryProps{
    id: string;
    name: string;
}

interface Props{
    categories: CategoryProps[]
}


export function Form({categories}: Props) {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")
    
    async function handleRegisterProduct(formData: FormData) {
        
        const categoryIndex = formData.get('category')
        const name = formData.get('name')
        const price = formData.get('price')
        const description = formData.get('description')

        if (!name || !categoryIndex || !price || !description || !image) {
            toast.warning('Preencha todos os campos!')
            return
        }
        
        const data = new FormData();
        
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image);
        
        const token = await getBearerToken();
        
        console.log(token)
        
        await api.post('/product', data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })   
             
        .catch((err) => {
            console.log(err);
            toast.warning('Falha ao cadastrar o produto!')       
            return;
        })

        toast.success('Produto cadastrado com sucesso!')
        
        //router.push('/dashboard')
        redirect("/dashboard")
    }
    

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        'use client'
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type !== 'image/jpeg' && image.type !== 'image/png') {
                toast.warning('Tipo de arquivo inválido! Apenas PNG e JPEG!');
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }        
    }

    return (
        <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#FFF' />
                    </span>

                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                    />
                    {previewImage && (
                        <Image
                            alt='Imagem do produto'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <select name='category'>
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type='text'
                    name='name'
                    placeholder='Nome do produto...'
                    required
                    className={styles.input}
                />

                <input
                    type='text'
                    name='price'
                    placeholder='Preço do produto...'
                    required
                    className={styles.input}
                />               

                <textarea
                    className={styles.input}
                    placeholder='Descrição do produto...'             
                    required
                    name='description'
                ></textarea>

                <Button name='Cadastrar produto'/>
            </form>
        </main>
    )
}

