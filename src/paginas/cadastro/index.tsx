import { z } from "zod";
import UserMenu from "../../componentes/UserMenu";
import { FiUpload } from "react-icons/fi";
import { Input } from "../../componentes/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import conteudoAPI from "../../services/contexAPI";
import { v4 as uuidV4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/conexaoFireBase";
import spinnerCar from '../../assets/spinner_car.json'
import Lottie from "lottie-react"



const schema = z.object({
    nomeCarro: z.string().nonempty("Campo obrigatório"),
    ano: z.string().nonempty("Campo obrigatório"),
    modelo: z.string().nonempty("Campo obrigatório"),
    marca: z.string().nonempty("Campo obrigatório"),
    km: z.string().nonempty("Campo obrigatório"),
    valor: z.string().nonempty("Campo obrigatório"),
    cidade: z.string().nonempty("Campo obrigatório"),
    estado: z.string().nonempty("Campo obrigatório"),
    whatsapp: z.string().nonempty("Campo obrigatório"),
    descricao: z.string().nonempty("Campo obrigatório"),

})

type FormData = z.infer<typeof schema>

export default function Cadastro() {
    const { usuario } = useContext(conteudoAPI)
    const [loadingImage, setLoadingImage] = useState(false)


    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    function cadastraCarro(data: FormData) {

    }

    function enviaImagem(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0].size <= 100000) {
            const imagem = e.target.files[0]
            upLoadImage(imagem)
        } else {
            toast.error('Insira imagens com no máximo 1mb')
        }
    }

    function upLoadImage(imagem: File) {
        const uidUsuario = usuario?.uid
        const uidImagem = uuidV4()
        const imagemRef = ref(storage, `imagens/${uidUsuario}/${uidImagem}`)
        setLoadingImage(true)

        uploadBytes(imagemRef, imagem).then((item) => {
            getDownloadURL(item.ref).then(() => {
                toast.success('Upload ok!')
                setLoadingImage(false)
            })
        }).catch((erro)=>{
            toast.error('Algo deu errado!')
            console.log(erro)
        })
    }

    return (
        <section className="container flex flex-col">
            <UserMenu />
            <div className="w-full flex items-center  bg-white rounded-lg p-4 mb-[16px]">
                <label className="w-48 h-36 flex items-center justify-center border-2 bg-white p-4 rounded-lg relative cursor-pointer">
                    <input className="invisible" type="file" accept="image/*" onChange={enviaImagem} />
                    {loadingImage ? <Lottie className="absolute w-[100px]" animationData={spinnerCar}/> :<FiUpload className="absolute cursor-pointer text-[2rem] text-gray-500" /> }
                    
                </label>
            </div>

            <div className="w-full flex items-center  bg-white rounded-lg p-4 mb-[60px]">
                <form onSubmit={handleSubmit(cadastraCarro)} className="w-full">
                    <div>
                        <p className="text-[.9rem] font-bold mb-[3px]"> Nome:</p>
                        <Input
                            type="text"
                            name="nomeCarro"
                            placeholder="Ex: Cruze"
                            register={register}
                            error={errors.nomeCarro?.message}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Ano:</p>
                            <Input
                                type="text"
                                name="ano"
                                placeholder="Ex: 2024"
                                register={register}
                                error={errors.ano?.message}
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Modelo:</p>
                            <Input
                                type="text"
                                name="modelo"
                                placeholder="Ex: 2025"
                                register={register}
                                error={errors.modelo?.message}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Marca:</p>
                            <Input
                                type="text"
                                name="marca"
                                placeholder="Ex: Chevrolet"
                                register={register}
                                error={errors.marca?.message}
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Km:</p>
                            <Input
                                type="text"
                                name="km"
                                placeholder="Ex: 24.000"
                                register={register}
                                error={errors.km?.message}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Cidade:</p>
                            <Input
                                type="text"
                                name="cidade"
                                placeholder="Ex: São Paulo"
                                register={register}
                                error={errors.cidade?.message}
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-[.9rem] font-bold mb-[3px]"> Estado:</p>
                            <Input
                                type="text"
                                name="estado"
                                placeholder="Ex: SP"
                                maxLength={2}
                                register={register}
                                error={errors.estado?.message}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="text-[.9rem] font-bold mb-[3px]"> Preço:</p>
                        <Input
                            type="text"
                            name="valor"
                            placeholder="Ex: R$ 79.000"
                            register={register}
                            error={errors.valor?.message}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-[.9rem] font-bold mb-[3px]"> Whatsapp:</p>
                        <Input
                            type="text"
                            name="valor"
                            placeholder="Ex: (11) 6566-7871"
                            register={register}
                            error={errors.whatsapp?.message}
                        />
                    </div>

                    <div className="w-full mb-[16px]">
                        <p className="text-[.9rem] font-bold mb-[3px]"> Descrição:</p>
                        <textarea
                            {...register("descricao")}
                            name="descricao"
                            id='descricao'
                            className="w-full border-[1px] outline-none p-2 rounded-md" ></textarea>
                    </div>

                    <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-md self-end'>Cadastrar</button>


                </form>
            </div>

        </section>
    )
}