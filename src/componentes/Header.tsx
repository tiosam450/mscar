import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from '../assets/logo_mscar.webp'
import { useContext, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";
import conteudoAPI from "../services/contexAPI";
import { signOut } from "firebase/auth";
import { auth } from "../services/conexaoFireBase";

export function Header() {
    const { usuario } = useContext(conteudoAPI)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const { logado } = useContext(conteudoAPI)
    const navigate = useNavigate()

    function logout() {
        if (confirm('Que pena, deseja realmente sair?')) {
            signOut(auth)
            navigate('/', {replace:true})
        }
    }

    return (
        <>
            <header className="w-full py-2 bg-white mb-[30px] sticky top-0 z-10">
                <div className="container ">
                    <Link to='/'><img src={logo} alt="logo" className="max-w-[150px] hover:text-red-700 transition-all " /></Link>

                    {/* {logado && !loadingAuth && <FiLogIn className="text-[1.8rem] text-slate-600 cursor-pointer" onClick={logout}/>} */}

                    {logado && !loadingAuth && <Link to='/dashboard'>
                        <div className="flex items-center gap-2 ">
                            <h3 className="text-[.8rem] text-gray-500">Olá, {usuario?.nome}</h3>
                            <HiOutlineUserCircle className="text-[1.8rem] text-gray-500 hover:text-red-700 transition-all" />
                        </div></Link>}

                    {!logado && !loadingAuth && <Link to='/login'><div className="flex items-center gap-2 ">
                        <h3 className="text-[.8rem] text-gray-500">Login</h3>
                        <HiOutlineUserCircle className="text-[1.8rem] text-gray-500 hover:text-red-700 transition-all" />
                    </div></Link>}
                </div>
            </header>
            <Outlet />
        </>
    )
}