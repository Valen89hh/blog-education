import { twMerge } from "tailwind-merge";

interface CardProps{
    children?: React.ReactNode,
    className?: string,
    onClick?: ()=>void
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    onClick
}) => {
    return ( 
        <div className={twMerge("border-solid border-2 border-slate-c p-4", className)} onClick={onClick}>
            {children}
        </div>
     );
}
 
export default Card;