import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo_mscar.webp'
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";

export function Header() {
    const [login, setLogin] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)


    return (
        <>
        <header className="w-full py-2 bg-white mb-[30px] sticky top-0">
            <div className="container ">
                <Link to='/'><img src={logo} alt="logo" className="max-w-[150px] hover:text-red-700 transition-all " /></Link>
                {login && loadingAuth && <FiLogIn className="text-[1.8rem] text-slate-600"/>}
                {!login && !loadingAuth && <Link to='/login'><HiOutlineUserCircle className="text-[1.8rem] text-gray-500 hover:text-red-700 transition-all" /></Link>}
            </div>
        </header>
        <Outlet />
        </>
    )
}