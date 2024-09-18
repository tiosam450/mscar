import { useForm } from 'react-hook-form'
import logo from '../../assets/logo_mscar.webp'
import { Input } from '../../componentes/Input'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/conexaoFireBase'
import toast from 'react-hot-toast'

const schema = z.object({
    email: z.string().nonempty('O campo é obrigatório').email('Insira um e-mail válido'),
    password: z.string().nonempty('O campo é obrigatório').min(6, 'A senha precisa ter no mínimo 6 caracteres')
})

type Formulario = z.infer<typeof schema>

export function Login(){
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm<Formulario>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    async function login(dados: Formulario){
       await signInWithEmailAndPassword(auth, dados.email, dados.password).then((user)=>{
            toast.success(`Bem-vindo ${user.user.displayName}`)
            navigate('/dashboard', {replace: true})
        }).catch((erro)=>{
            if(erro =='FirebaseError: Firebase: Error (auth/invalid-credential).'){
                toast.error('E-mail ou senha inválido')
            }
        })
    }

    return(
        <section className='w-full h-screen flex flex-col items-center justify-center'>
           <Link to='/'> <img className='max-w-[200px] mb-10' src={logo} alt="logo" /></Link>
            <h1 className='mb-4 text-[1.2rem] font-bold'>Login</h1>

            <form onSubmit={handleSubmit(login)} action="" className='w-[90%] max-w-[450px] mx-4 flex flex-col items-center rounded-xl gap-2'>
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