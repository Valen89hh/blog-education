import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: string | null,
    classNameText?: string
}

const CheckBox: React.FC<CheckBoxProps> = ({
    className,
    error,
    placeholder,
    classNameText,
    ...props
}) => {
    return ( 
        <div>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input {...props} type="checkbox" className={twMerge("cursor-pointer min-w-4 min-h-4 w-4 h-4 bg-transparent border-2 border-onyx-dark rounded-sm focus:ring-0 appearance-none checked:bg-onyx-dark checked:border-onyx-dark checked:before:content-['✓'] checked:before:text-white checked:before:text-[0.6rem] checked:before:flex checked:before:justify-center checked:before:items-center", className)}/>
                {placeholder && (

                    <span className={twMerge("text-onyx-dark", classNameText)}>{placeholder}</span>
                )}
            </label>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
     );
}
 
export default CheckBox;