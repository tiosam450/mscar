import UserMenu from "../../componentes/UserMenu";
import { FiUpload } from "react-icons/fi";

export function Dashboard(){
    return(
        <section className="container flex flex-col">
            <UserMenu/>
            <div className="w-full flex items-center  bg-white rounded-lg p-4">
                <label className="w-48 h-36 flex items-center justify-center border-2 bg-white p-4 rounded-lg relative cursor-pointer">
                    <input className="invisible" type="file" accept="image/*"/>
                    <FiUpload className="absolute cursor-pointer text-[2rem] text-gray-500" />
                </label>
            </div>
        </section>
    )
}