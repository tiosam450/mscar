import { useContext } from "react"
import conteudoAPI from "../services/contexAPI"
import spinnerCar from '../assets/spinner_car.json'
import { Navigate } from "react-router-dom"
import Lottie from "lottie-react"



export function Private({ children }: any) {
    const { loadingAuth, logado } = useContext(conteudoAPI)

    if (loadingAuth) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Lottie className="max-w-[250px] " animationData={spinnerCar} />
            </div>
        )
    }

    if(!logado){
        return <Navigate to='/login'/>
    }


    return children
}