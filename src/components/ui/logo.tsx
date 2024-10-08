import Image from "next/image";
import Link from "next/link";

interface LogoProps{
    size?: number,
    className?: string
}

const Logo: React.FC<LogoProps> = ({
    size = 1,
    className
}) => {
    return (
        <Link href={"/"}>
            <Image
                alt="logo"
                src={"/Logo.svg"}
                width={97*size}
                height={50*size}
                className={className}
            />
        </Link> 
     );
}
 
export default Logo;