import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db } from "../../services/conexaoFireBase"
import { FaWhatsapp } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";

interface AnuncioProps {
    id: string
    marca: string
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
            if (!id) {
                return
            }

            const docRef = doc(db, 'anuncios', id)
            getDoc(docRef).then((item) => {
                setCarro({
                    id: id,
                    marca: item.data()?.marca,
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

            }).catch((erro) => {
                console.log(erro)
            })
        }
        carregaAnuncios()

    }, [])

    return (
        <>
            <div className="w-full max-h-[250px] mt-[-30px] object-cover overflow-hidden flex items-center justify-center">
                <img className="w-full" src={carro?.fotos[0].url} alt="" />
            </div>

            <section className="!mt-[-30px] container w-full flex items-center justify-center gap-4 ">
                <div className="bg-white w-full h-[500px] rounded-lg p-6">
                    <h1 className=" sm:text-[1.8rem] font-bold text-red-700"><span className="text-gray-700">{carro?.marca}</span> {carro?.nomeCarro}</h1>

                    <p className="mb-4 text-gray-500 text-[1rem]">{carro?.modelo}</p>

                    <div className="w-full flex flex-col mb-4">
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Ano:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.ano}</p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Km:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.km}</p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Cor:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.km}</p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Combustível:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.combustivel}</p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Câmbio:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.cambio}</p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-500 text-[.9rem] mb-[-5px]">Aceita troca:</p>
                            <p className="font-bold text-[1.2rem]">{carro?.troca}</p>
                        </div>


                    </div>
                    <hr className="h-1" />
                    <p className="py-2 pb-4 text-gray-500 flex items-center gap-2"><PiMapPin />{carro?.cidade} - {carro?.estado}</p>
                </div>

                <div className="bg-white w-[50%] h-[500px] rounded-lg p-8">
                    <h1 className="font-bold text-gray-500 text-[1.8rem] mb-[30px]">R$ {carro?.valor}</h1>
                    <button className="w-full p-2 bg-slate-600 hover:bg-green-500 transition-all rounded-lg text-white"><Link to={`wa.me/55${carro?.whatsapp}`} className="flex items-center justify-center gap-2 text-[1.6rem] font"><FaWhatsapp />{carro?.whatsapp}</Link></button>
                </div>


            </section>
        </>
    )
}