import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: string | null
}

const CheckBox: React.FC<CheckBoxProps> = ({
    className,
    error,
    placeholder,
    ...props
}) => {
    return ( 
        <div>
            <label className="flex items-center space-x-3 cursor-pointer">
                <input {...props} type="checkbox" className="cursor-pointer min-w-5 min-h-5 w-5 h-5 bg-transparent border-2 border-onyx-dark rounded-sm focus:ring-0 appearance-none checked:bg-onyx-dark checked:border-onyx-dark checked:before:content-['✓'] checked:before:text-white checked:before:text-[0.7rem] checked:before:flex checked:before:justify-center checked:before:items-center"/>
                {placeholder && (

                    <span className="text-onyx-dark">{placeholder}</span>
                )}
            </label>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
     );
}
 
export default CheckBox;