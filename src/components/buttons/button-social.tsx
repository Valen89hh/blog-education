import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./button-primary";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/utils/formatter-string";

type Icon = "google" | "github"

interface IconSocial {
    icon: Icon,
    path: string
}

const iconsSocial: IconSocial[] = [
    {
        icon: "google",
        path: "/icons-social/google.svg"
    },
    {
        icon: "github",
        path: "/icons-social/github.svg"
    },
]

interface ButtonSocialProps extends ButtonProps{
    icon: Icon
}

const ButtonSocial: React.FC<ButtonSocialProps> = ({
    className,
    children,
    icon,
    ...props
}) => {
    const iconSelect = iconsSocial.find(ic=>ic.icon == icon)

    return ( 
        <button className={twMerge("bg-transparent border-solid border-onyx-dark border-2 text-onyx-dark rounded-[4px] px-4 py-2 w-full flex gap-1 justify-center items-center text-sm", className)} {...props}>
            {iconSelect && (
                <>
                    <Image
                        src={iconSelect.path}
                        alt={iconSelect.icon}
                        width={25}
                        height={25}
                    />
                    <span>Iniciar con {capitalizeFirstLetter(iconSelect.icon)}</span>
                </>
            )}
        </button>
     );
}
 
export default ButtonSocial;