"use client"

import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: string | null,
    label?: string
}

const Field: React.FC<FieldProps> = ({
    className,
    error,
    label,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)

    return ( 
        <div>
            {label && (
                <label className="font-medium text-lg" htmlFor={props.id}>
                    {label}
                </label>
            )}
            <div className={`border-solid ${label && "mt-1"} bg-white px-4 py-3 rounded-sm border-2 space-y-1
                ${error ? "border-red-500" : isFocus ? "border-onyx-dark" : "border-slate-e"}`}>
                <input 
                    className={twMerge("outline-none w-full border-none placeholder:text-ash-gray text-onyx-dark", className)} 
                    {...props} 
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                />
            </div>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
     );
}
 
export default Field;