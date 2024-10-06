import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./button-primary";



const ButtonOutline: React.FC<ButtonProps> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button className={twMerge("bg-transparent border-solid border-onyx-dark border-2 text-onyx-dark rounded-[4px] px-4 py-2", className)} {...props}>
            {children}
        </button>
     );
}
 
export default ButtonOutline;