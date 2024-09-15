import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "./conexaoFireBase";

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
    dadosUsuario: ({uid, nome, email}:UserProps)=>void;
    usuario: UserProps | null;
}


const conteudoAPI = createContext({} as DadosApi)

export function ApiProvider({ children }: ChildrenProps) {

    const [usuario, setUsuario] = useState<UserProps | null>(null)
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

    function dadosUsuario({uid, nome, email, }:UserProps){
        setUsuario({
            uid,
            nome,
            email,
        })
    }

    return (
        <conteudoAPI.Provider value={{
            logado: !!usuario,
            loadingAuth,
            dadosUsuario,
            usuario

        }}>
            {children}
        </conteudoAPI.Provider>
    )
}

export default conteudoAPI