import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/conexaoFireBase";
import { FiLogIn } from "react-icons/fi";

export default function UserMenu(){
    const navigate = useNavigate()
   
    function logout() {
        if (confirm('Que pena, deseja realmente sair?')) {
            signOut(auth)
            navigate('/', {replace:true})
        }
    }
   
    return(
        <div className=" w-full px-4 py-2 text-white bg-red-700 flex items-center justify-between gap-4 rounded-md mx-auto mb-[60px]">
            <div className="flex items-center gap-4">
                <Link className="sm:text-[1rem] text-[.8rem] hover:text-red-200 transition-all" to='/dashboard'>Dashboard</Link>
                <h2>|</h2>
                <Link className="sm:text-[1rem] text-[.8rem] hover:text-red-200 transition-all" to='/cadastro'>Cadastrar veículo</Link>
            </div>
            <button className="flex sm:text-[1rem]  items-center gap-2 text-[.8rem] hover:text-red-200 transition-all" onClick={logout}><span className="sm:flex hidden">Sair da conta</span><FiLogIn className="text-[1.2rem]"/></button>
        </div>
    )
}