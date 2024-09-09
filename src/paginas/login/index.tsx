import { useForm } from 'react-hook-form'
import logo from '../../assets/logo_mscar.webp'
import { Input } from '../../componentes/Input'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email('Insira um e-mail válido').nonempty('O campo é obrigatório'),
    password: z.string().nonempty('O campo é obrigatório')
})

type Formulario = z.infer<typeof schema>

export function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm<Formulario>({
        resolver: zodResolver(schema),
        mode:  'onChange'
    })

    return(
        <section className='w-full h-screen flex flex-col items-center justify-center'>
            <img className='max-w-[200px] mb-10' src={logo} alt="logo" />
            <form action="" className='w-[90%] max-w-[450px] mx-4 flex flex-col items-center rounded-xl gap-4 '>
                <Input
                type='email'
                name='email'
                placeholder='Digite seu email'
                error={errors.email?.message}
                register={register}
                
                />
                {/* <Input placeholder='******'/> */}
                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-md self-end'>Entrar</button>
            </form>
        </section>
    )
}