import { PiMapPin } from "react-icons/pi";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <section className="container w-full flex flex-col items-center justify-center">
            <div className="sm:w-[80%] flex items-center justify-center gap-4 p-4 bg-white rounded-lg mb-[60px]" >
                <input type="text" placeholder="Digite o nome do carro..." className="w-full rounded-md p-2 outline-none border-2 " />
                <button className="w-[20%] flex items-center justify-center bg-red-700 hover:bg-red-600 transition-all text-white rounded-md p-2 px-8 ">Buscar</button>
            </div>

            <h1 className="text-[1.4rem] text-center font-bold mb-[60px]">Carros novos e usados em todo o Brasil</h1>

            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 sm:m-4">
                <Link to='#'>
                    <div className="bg-white rounded-lg overflow-hidden ">
                        <img className="w-[full] mb-3 hover:scale-[1.03] transition-all" src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202408/20240816/chevrolet-tracker-1.2-turbo-flex-premier-automatico-wmimagem14513584887.jpg?s=fill&w=1920&h=1440&q=75" alt="carro" />
                       
                        <div>
                            <h1 className=" sm:text-[1.2rem] font-bold text-red-700 mx-4 "><span className="text-gray-700">CHEVROLET</span> TRACKER</h1>
                            <p className="mx-4 mb-4 text-gray-500 text-[.8rem]">1.2 TURBO FLEX PREMIER AUTOMÁTICO</p>
                            <strong className="mx-4 mb-4 sm:text-[1.4rem] text-gray-700">R$ 135.890</strong>
                            <div className="w-full flex justify-between px-4 mb-4">
                                <p className="text-gray-500 ">22/23</p>
                                <p className="text-gray-500 ml-2">15.939 km</p>
                            </div>
                            <hr className="h-1" />
                            <p className="px-4 py-2 pb-4 text-gray-500 flex items-center gap-2"><PiMapPin />São José - SC</p>
                        </div>
                    </div>
                </Link>

            </section>
        </section>
    )
}