import { createBrowserRouter } from "react-router-dom";
import { Header } from "../componentes/Header";
import { Home } from "../paginas/home";
import { Dashboard } from "../paginas/dashboard";
import { Detalhes } from "../paginas/detalhes";
import { Registro } from "../paginas/registro";
import { Login } from "../paginas/login";
import { Private } from "./private";
import Cadastro from "../paginas/cadastro";


const rotas = createBrowserRouter([{
    element: <Header />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/dashboard',
            element: <Private><Dashboard/></Private>
        },
        {
            path: '/detalhes',
            element: <Detalhes />
        },
        {
            path: '/detalhes:id',
            element: <Detalhes />
        },
        {
            path: '/cadastro',
            element:<Private><Cadastro/></Private>
        },
    ]
},
    {
        path: '/registro',
        element: <Registro />
    },
    {
        path: '/login',
        element: <Login />
    },


])

export default rotas