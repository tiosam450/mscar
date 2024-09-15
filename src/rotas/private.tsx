import { useContext } from "react"
import conteudoAPI from "../services/contexAPI"
import spinnerCar from '../assets/car-loading-animation.webp'
import { Navigate } from "react-router-dom"


export function Private({ children }: any) {
    const { loadingAuth, logado } = useContext(conteudoAPI)

    if (loadingAuth) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <img className="max-w-[350px] mix-blend-multiply " src={spinnerCar} alt="" />
            </div>
        )
    }

    if(!logado){
        return <Navigate to='/login'/>
    }


    return children
}