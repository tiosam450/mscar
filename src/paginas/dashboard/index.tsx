import UserMenu from "../../componentes/UserMenu";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PiMapPin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { db, storage } from "../../services/conexaoFireBase";
import spinnerCar from '../../assets/spinner_car.json'
import Lottie from "lottie-react"
import { FaTrash } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
import conteudoAPI from "../../services/contexAPI";

interface AnuncioProps {
    id: string
    marca: string
    nome: string
    nomeCarro: string
    modelo: string
    valor: string
    ano: string
    km: string
    cidade: string
    estado: string
    fotos: GaleriaProps[]
    uid: string
}

interface GaleriaProps {
    uid: string
    nome: string
    url: string
}





export function Dashboard() {
    const { usuario } = useContext(conteudoAPI)
    const [anuncios, setAnuncios] = useState<AnuncioProps[]>([])
    const [loadingImagem, setLoadingImagem] = useState<string[]>([])

    useEffect(() => {
        function carregaAnuncios() {
            const anuncioRef = collection(db, 'anuncios')
            const queryRef = query(anuncioRef, where('uid', '==', usuario?.uid), orderBy('data', 'desc'))

            getDocs(queryRef).then((item) => {
                const anuncios = [] as AnuncioProps[]

                item.forEach((item) => {
                    anuncios.push({
                        id: item.id,
                        marca: item.data().marca,
                        nome: item.data().nome,
                        nomeCarro: item.data().nomeCarro,
                        modelo: item.data().modelo,
                        valor: item.data().valor,
                        ano: item.data().ano,
                        km: item.data().km,
                        cidade: item.data().cidade,
                        estado: item.data().estado,
                        fotos: item.data().fotos,
                        uid: item.data().uid
                    })
                })
                setAnuncios(anuncios)
            })
        }
        carregaAnuncios()



    }, [])

    function loadingImages(id: string) {
        setLoadingImagem(prevLoadImage => [...prevLoadImage, id])
    }

    async function delImage(item: GaleriaProps) {
        const imagePath = `imagens/${item.uid}/${item.nome}`
        const imageRef = ref(storage, imagePath)

        await deleteObject(imageRef).then(() => {
            toast.success("Deletado com sucesso!")
        }).catch((erro) => {
            toast.error('Algo deu errado')
            console.log(erro)
        })
    }

    async function delAnuncio(item: AnuncioProps) {
        const anunciosRef = item

        if (confirm('Deseja deletar este anúncio')) {
            const docRef = doc(db, 'anuncios', anunciosRef.id)
            await deleteDoc(docRef).then(()=>{
                toast.success('anúncio deletado com sucesso!')
            }).catch((erro)=>{
                toast.error('Ops! Algo deu errado!')
                console.log(erro)
            })

            anunciosRef.fotos.map(async (item)=>{
                const imagePath = `imagens/${item.uid}/${item.nome}`
                const imageRef = ref(storage, imagePath)
                deleteObject(imageRef)
                setAnuncios(anuncios.filter((item) => item.id !== anunciosRef.id))
            })
        }
    }

    return (
        <section className="container flex flex-col">
            <UserMenu />
            <section className="container w-full flex flex-col items-center justify-center">
                <div className="sm:w-[80%] flex items-center justify-center gap-4 p-4 bg-white rounded-lg mb-[60px]" >
                    <input type="text" placeholder="Digite o nome do carro..." className="w-full rounded-md p-2 outline-none border-2 " />
                    <button className="w-[20%] flex items-center justify-center bg-red-700 hover:bg-red-600 transition-all text-white rounded-md p-2 px-8 ">Buscar</button>
                </div>

                <h1 className="text-[1.4rem] text-center font-bold mb-[60px]">{anuncios.length == 0 ? 'Você ainda não tem anúncios' : 'Seus anúncios'}</h1>

                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:m-4">
                    {anuncios.map((item) => (
                        <section key={item.id}>
                            <div className="h-[430px] bg-white rounded-lg overflow-hidden flex flex-col justify-between ">
                                <div className="w-[full] h-[200px] mb-3 bg-slate-200 flex items-center justify-center" style={{ display: loadingImagem.includes(item.id) ? 'none' : 'flex' }}><Lottie className="absolute w-[150px]" animationData={spinnerCar} /></div>
                                
                                <div className="max-h-[200px] mb-3 overflow-hidden relative">
                                    <button className="absolute top-0 right-0 m-2 text-[1.2rem] text-white hover:scale-[1.05] transition-all z-10" onClick={() => delAnuncio(item)}><FaTrash /></button>

                                    <img className="w-[full] hover:scale-[1.03] object-cover transition-all"
                                        style={{ display: loadingImagem.includes(item.id) ? 'block' : 'none' }}
                                        src={item.fotos[0].url}
                                        alt="carro"
                                        onLoad={() => loadingImages(item.id)}
                                    />
                                </div>

                                <div>
                                    <h1 className=" sm:text-[1.2rem] font-bold text-red-700 mx-4 "><span className="text-gray-700">{item.marca}</span> {item.nomeCarro}</h1>
                                    <p className="mx-4 mb-4 text-gray-500 text-[.8rem]">{item.modelo}</p>
                                    <strong className="mx-4 mb-4 sm:text-[1.4rem] text-gray-700">R$ {item.valor}</strong>
                                    <div className="w-full flex justify-between px-4 mb-4">
                                        <p className="text-gray-500 ">{item.ano}</p>
                                        <p className="text-gray-500 ml-2">{item.km} km</p>
                                    </div>
                                    <hr className="h-1" />
                                    <Link to={`/detalhes/${item.id}`} className="px-4 py-2 pb-4 text-gray-500 flex items-center gap-2">Ver anúncio</Link>
                                </div>
                            </div>
                        </section>
                    ))}

                </section>
            </section>

        </section>
    )
}