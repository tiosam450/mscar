import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo_mscar.webp'
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export function Header() {
    const [login, setLogin] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)


    return (
        <>
        <header className="w-full py-2 bg-white mb-[30px]">
            <div className="container ">
                <Link to='/'><img src={logo} alt="logo" className="max-w-[150px]" /></Link>
                {login && loadingAuth && <BiLogIn className="text-[1.8rem] text-slate-600"/>}
                {!login && !loadingAuth && <Link to='/login'><FaRegUserCircle className="text-[1.8rem] text-gray-500" /></Link>}
            </div>
        </header>
        <Outlet />
        </>
    )
}