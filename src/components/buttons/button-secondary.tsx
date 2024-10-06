import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./button-primary";


const ButtonSecondary: React.FC<ButtonProps> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button className={twMerge("border-2 border-white bg-white text-onyx-dark rounded-[4px] px-4 py-2", className)} {...props}>
            {children}
        </button>
     );
}
 
export default ButtonSecondary;