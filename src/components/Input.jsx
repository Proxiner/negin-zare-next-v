export default function Input({id, label, type, register, errorMesage, placeholder , className }) {
    return (
        <>
        <label htmlFor={id}> {label} </label>
        <input className={className} type={type} id={id} {...register} placeholder={placeholder}/>
        </>
    )
}