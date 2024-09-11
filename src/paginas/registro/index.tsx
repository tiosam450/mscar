import { useForm } from 'react-hook-form'
import logo from '../../assets/logo_mscar.webp'
import { Input } from '../../componentes/Input'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {Link} from 'react-router-dom'

const schema = z.object({
    nome: z.string().nonempty('O campo é obrigatório'),
    email: z.string().email('Insira um e-mail válido').nonempty('O campo é obrigatório'),
    password: z.string().nonempty('O campo é obrigatório').min(6, 'A senha precisa ter no mínimo 6 caracteres')
})

type Formulario = z.infer<typeof schema>

export function Registro(){
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
            <form onSubmit={handleSubmit(login)} action="" className='w-[90%] max-w-[450px] mx-4 flex flex-col items-center rounded-xl gap-4 '>
                <Input
                type='text'
                name='nome'
                placeholder='Digite seu nome'
                error={errors.nome?.message}
                register={register}
                />

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

                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-md self-end'>Cadastrar</button>

                <Link to='/login'><p className='text-[.8rem] text-gray-500'>Já tem uma conta? Cadastre-se </p></Link>

            </form>
        </section>
    )
}