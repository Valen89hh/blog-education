"use client"

import Container from "@/components/containers/container";
import { ROUTES_NOT_LAYOUT } from "@/constants/routes";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName = usePathname()

    if(ROUTES_NOT_LAYOUT.some(route=>pathName.startsWith(route))) return null


    return ( 
        <footer className="py-6 bg-onyx-dark text-white">
            <Container className="flex justify-between items-center">
                <p>All rights reserved to Learn</p>
                <ul className="flex items-center gap-2 text-[0.7rem]">
                    <li>
                        <Link href={""} className="flex flex-col items-center justify-center">
                            <Facebook size={18}/>
                            <span >29</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={""} className="flex flex-col items-center justify-center">
                            <Twitter size={18}/>
                            <span >29K</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={""} className="flex flex-col items-center justify-center">
                            <Instagram size={18}/>
                            <span >9K</span>
                        </Link>
                    </li>
                </ul>
            </Container>
        </footer>
     );
}
 
export default Footer;