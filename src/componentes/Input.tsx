import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    name: string
    placeholder?: string
    type?: string
    id?: string
    maxLength?: number
    onchange?: any
    error?: string
    rules?: RegisterOptions
    value?: string
    checked?: boolean
    register: UseFormRegister<any>

}
export function Input({ name, value, checked, placeholder, type, register, error, rules, maxLength}: InputProps) {
    return (
        <div className='w-full mb-[16px]'>
            <input className='w-full border-[1px] outline-none p-2 rounded-md flex items-center'
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
                checked={checked}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-600 mt-[5px] text-[.8rem] self-start">{error}</p>}
        </div>
    )
}