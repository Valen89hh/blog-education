"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: string | null,
    label?: string
}

const FieldPassword: React.FC<FieldProps> = ({
    className,
    error,
    label,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(true)

    return ( 
        <div>
            {label && (
                <label className="font-medium text-lg" htmlFor={props.id}>
                    {label}
                </label>
            )}
            <div className={`border-solid ${label && "mt-1"} bg-white px-4 py-3 flex gap-2 items-center rounded-sm border-2 space-y-1
                ${error ? "border-red-500" : isFocus ? "border-onyx-dark" : "border-slate-e"}`}>
                <input 
                    className={twMerge("outline-none w-full border-none placeholder:text-ash-gray text-onyx-dark", className)} 
                    {...props} 
                    type={visiblePassword ? "password" : "text"}
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                />
                <AnimatePresence>
                    {visiblePassword ? (
                        <motion.button
                            className="text-onyx-dark"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            type="button"
                            onClick={()=>setVisiblePassword(false)}
                        >
                            <EyeOff/>
                        </motion.button>
                    ): (
                        <motion.button
                            className="text-onyx-dark"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            type="button"
                            onClick={()=>setVisiblePassword(true)}
                        >
                            <Eye/>
                        </motion.button>

                    )}
                </AnimatePresence>
            </div>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
     );
}
 
export default FieldPassword;