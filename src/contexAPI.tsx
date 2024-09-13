import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "./services/conexaoFireBase";

interface ChildrenProps {
    children: ReactNode
}

interface UserProps{
    uid: string
    nome: string | null
    email: string | null
}

type DadosApi = {
    logado: boolean;
    loadingAuth: boolean;
}


const conteudoAPI = createContext({} as DadosApi)

export function ApiProvider({ children }: ChildrenProps) {

    const [usuario, setUsuario] = useState<UserProps | null>()
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(()=>{
        const checkUsuario = onAuthStateChanged(auth, (user)=>{
            if (user){
            setUsuario({
                uid: user.uid,
                nome: user?.displayName,
                email: user?.email,
            })
            setLoadingAuth(false)
            }else{
                setUsuario(null)
                setLoadingAuth(false)
            }
        })

        console.log(usuario)

        return () => checkUsuario()
        

    },[])

    return (
        <conteudoAPI.Provider value={{
            logado: !!usuario,
            loadingAuth,

        }}>
            {children}
        </conteudoAPI.Provider>
    )
}

export default conteudoAPI