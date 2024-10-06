import { twMerge } from "tailwind-merge";

interface ContainerProps{
    className?: string,
    children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    className,
    children
}) => {
    return ( 
        <div className={twMerge("mx-auto container", className)}>
            {children}
        </div>
     );
}
 
export default Container;