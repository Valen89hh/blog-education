import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const ButtonPrimary: React.FC<ButtonProps> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button className={twMerge("border-2 border-onyx-dark bg-onyx-dark text-white rounded-[4px] px-4 py-2", className)} {...props}>
            {children}
        </button>
     );
}
 
export default ButtonPrimary;