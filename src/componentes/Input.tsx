import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    name: string
    placeholder?: string
    type?: string
    onchange?: any
    register: UseFormRegister<any>
    error?: string
    rules?: RegisterOptions

}
export function Input({ name, placeholder, type, register, error, rules  }: InputProps) {
    return (
        <>
        <input className='w-full border-[1px] outline-none p-2 rounded-lg'
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            id={name}
        />
        {error && <p className="text-red-600 ms-2 mt-[-10px] text-[.8rem] self-start">{error}</p>    }
        </>
    )
}