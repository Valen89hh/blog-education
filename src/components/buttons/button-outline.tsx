import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./button-primary";
import { CircularProgress } from "@mui/material";



const ButtonOutline: React.FC<ButtonProps> = ({
    className,
    children,
    isLoading,
    ...props
}) => {
    return ( 
        <button className={twMerge("bg-transparent disabled:opacity-50 border-solid border-onyx-dark border-2 text-onyx-dark rounded-[4px] items-center justify-center flex gap-2 px-4 py-2", className)} {...props}>
             {isLoading && (
                <CircularProgress size={16} color="inherit"/>
            )}
            {children}
        </button>
     );
}
 
export default ButtonOutline;