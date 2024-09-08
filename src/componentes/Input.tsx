interface InputProps {
    name?: string
    placeholder?: string
    type?: string
    onchange?: any
}
export function Input({ name, placeholder, type }: InputProps) {
    return (
        <input className='w-full border-[1px] outline-none p-2 rounded-lg'
            type={type}
            name={name}
            placeholder={placeholder}
        />
    )
}