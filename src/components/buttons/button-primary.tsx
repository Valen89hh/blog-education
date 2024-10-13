import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading?: boolean
}

const ButtonPrimary: React.FC<ButtonProps> = ({
    className,
    children,
    isLoading = false,
    ...props
}) => {
    return ( 
        <button className={twMerge("border-2 border-onyx-dark bg-onyx-dark text-white rounded-[4px] px-4 py-2 items-center justify-center flex gap-2", className)} {...props}>
            {isLoading && (
                <CircularProgress size={16} color="inherit"/>
            )}
            {children}
        </button>
     );
}
 
export default ButtonPrimary;