import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../services/conexaoFireBase"
import { FaWhatsapp } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Keyboard, Pagination, Navigation } from 'swiper/modules';

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
    cambio: string
    combustivel: string
    troca: string
    cor: string
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
    const whats = carro?.whatsapp.replace(/[^a-zA-Z0-9]/g, '');
    const navigate = useNavigate()

    useEffect(() => {
        function carregaAnuncios() {
            if (!id) {
                return
            }

            const docRef = doc(db, 'anuncios', id)
            getDoc(docRef).then((item) => {

                if(!item.data()){
                    navigate('/', {replace:true})
                }

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
                    cambio: item.data()?.cambio,
                    troca: item.data()?.troca,
                    cor: item.data()?.cor,
                    combustivel: item.data()?.combustivel,
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
            <div className="w-full object-cover flex items-center justify-center mb-[30px] ">
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={1}
                    zoom={true}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Zoom, Keyboard, Pagination, Navigation]}
                    className="w-full max-w-[1160px] max-h-[350px] bg-white object-cover flex items-center justify-center rounded-lg ">
                    {carro?.fotos.map((foto) => (
                        <SwiperSlide key={foto.nome}><div className="swiper-zoom-container"><img src={foto.url} alt={foto.nome} /></div></SwiperSlide>
                    ))}

                </Swiper>
            </div>

            <section className="mt-[16px] container w-full flex flex-col !items-start md:flex-row gap-4 ">
                <div className="bg-white w-full rounded-lg p-6">
                    <h1 className=" sm:text-[1.8rem] font-bold text-red-700"><span className="text-gray-700">{carro?.marca}</span> {carro?.nomeCarro}</h1>

                    <p className="mb-4 text-gray-500 text-[1rem]">{carro?.modelo}</p>

                    <div className="w-full flex mb-4">
                        <div>
                            <div className="mb-4">
                                {carro?.ano ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Ano:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.ano}</p>
                            </div>

                            <div className="mb-4">
                                {carro?.km ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Km:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.km}</p>
                            </div>

                            <div className="mb-4">
                                {carro?.cor ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Cor:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.cor}</p>
                            </div>
                        </div>

                        <div className="ml-[50px] sm:ml-[100px]">
                            <div className="mb-4">
                                {carro?.combustivel ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Combustível:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.combustivel}</p>
                            </div>

                            <div className="mb-4">
                                {carro?.cambio ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Câmbio:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.cambio}</p>
                            </div>

                            <div className="mb-4">
                                {carro?.troca ? <p className="text-gray-500 text-[.9rem] mb-[-5px]">Aceita troca:</p> : ""}
                                <p className="font-medium text-[1.2rem]">{carro?.troca}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        {carro?.descricao ? <p className="text-gray-500 text-[.9rem] mb-[px]">Descrição:</p> : ''}
                        <p className=" text-[1rem]">{carro?.descricao}</p>
                    </div>
                    <hr className="h-1" />
                    <p className="py-4 pb-4 text-gray-500 flex items-center gap-2"><PiMapPin />{carro?.cidade} - {carro?.estado}</p>
                </div>

                <div className="bg-white w-full order-first md:order-last md:w-[60%] lg:md:w-[50%] rounded-lg p-4 md:p-8">
                    <h1 className="font-bold text-gray-500 text-[1.6rem] md:text-[1.8rem] mb-[10px] md:mb-[20px]">R$ {carro?.valor}</h1>
                    <button className="w-full p-2 bg-slate-600 hover:bg-green-500 transition-all rounded-lg text-white"><a href={`https://wa.me/55${whats}/?text=Olá vi o ${carro?.marca} ${carro?.nomeCarro} e fiquei interessado!` }target='blank' className="flex items-center justify-center gap-2 text-[1.2rem] md:text-[1.4rem] font"><FaWhatsapp />{carro?.whatsapp}</a></button>
                </div>

            </section>
        </>
    )
}