import logo from '../../assets/logo_mscar.webp'
import { Input } from '../../componentes/Input'

export function Login(){
    return(
        <section className='w-full h-screen flex flex-col items-center justify-center'>
            <img className='max-w-[200px] mb-10' src={logo} alt="logo" />
            <form action="" className='w-[90%] max-w-[450px] mx-4 flex flex-col items-center rounded-xl gap-4 '>
                <Input placeholder={'Digite seu email'}/>
                <Input placeholder={'******'}/>
                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-md self-end'>Entrar</button>
            </form>
        </section>
    )
}