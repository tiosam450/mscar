import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../services/conexaoFireBase"

interface AnuncioProps {
    id: string
    marca: string
    nome: string
    nomeCarro: string
    modelo: string
    valor: string
    descricao: string
    ano: string
    km: string
    cidade: string
    estado: string
    fotos: GaleriaProps[]
    uid: string
    proprietario: string
    whatsapp: string
    data: string
}

interface GaleriaProps {
    uid: string
    nome: string
    url: string
}

export function Detalhes() {
    const [carro, setCarro] = useState<AnuncioProps>()
    const { id } = useParams()

    useEffect(() => {
        function carregaAnuncios() {
            if(!id){
                return
            }

            const docRef = doc(db, 'anuncios', id)
            getDoc(docRef).then((item)=>{
                setCarro({
                    id: id,
                    marca: item.data()?.modelo,
                    nome: item.data()?.nome,
                    nomeCarro: item.data()?.nomeCarro,
                    modelo: item.data()?.modelo,
                    valor: item.data()?.valor,
                    descricao: item.data()?.descricao,
                    ano: item.data()?.ano,
                    km: item.data()?.km,
                    cidade: item.data()?.cidade,
                    estado: item.data()?.estado,
                    fotos: item.data()?.fotos,
                    uid: item.data()?.uid,
                    proprietario: item.data()?.proprietario,
                    whatsapp: item.data()?.whatsapp,
                    data: item.data()?.data
                }
            )
            console.log(carro)
            }).catch((erro)=>{
                console.log(erro)
            })
        }
        carregaAnuncios()

    }, [])

    return (
        <section>
            <h1>Detalhes</h1>
        </section>
    )
}