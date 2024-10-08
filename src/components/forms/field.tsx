"use client"

import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: string | null
}

const Field: React.FC<FieldProps> = ({
    className,
    error,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)

    return ( 
        <div>
            <div className={`border-solid bg-white p-2 rounded-sm border-2 space-y-1
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