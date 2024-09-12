import { createContext, ReactNode } from "react";

interface childrenProps{
    children: ReactNode
}

const conteudoAPI = createContext({})

export function apiProvider ({children}:childrenProps){
    <conteudoAPI.Provider value={{

    }}>
        {children}
    </conteudoAPI.Provider>
}