import { useForm } from 'react-hook-form'
import logo from '../../assets/logo_mscar.webp'
import { Input } from '../../componentes/Input'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const schema = z.object({
    email: z.string().nonempty('O campo é obrigatório').email('Insira um e-mail válido'),
    password: z.string().nonempty('O campo é obrigatório')
})

type Formulario = z.infer<typeof schema>

export function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm<Formulario>({
        resolver: zodResolver(schema),
        mode:  'onChange'
    })

    function login(dados: Formulario){
        console.log(dados)
    }

    return(
        <section className='w-full h-screen flex flex-col items-center justify-center'>
            <img className='max-w-[200px] mb-10' src={logo} alt="logo" />
            
            <h1 className='mb-4 text-[1.2rem] font-bold'>Login</h1>

            <form onSubmit={handleSubmit(login)} action="" className='w-[90%] max-w-[450px] mx-4 flex flex-col items-center rounded-xl gap-4 '>
                <Input
                type='email'
                name='email'
                placeholder='Digite seu e-mail'
                error={errors.email?.message}
                register={register}
                />
                
                <Input
                type='password'
                name='password'
                placeholder='******'
                error={errors.password?.message}
                register={register}
                />

                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-md self-end'>Entrar</button>

                <Link to='/registro'><p className='text-[.8rem] text-gray-500'>Ainda não tem uma conta? Cadastre-se</p></Link>
            </form>
        </section>
    )
}