"use client"

import Container from "@/components/containers/container";
import Logo from "../ui/logo";
import Link from "next/link";
import ButtonOutline from "../buttons/button-outline";
import ButtonPrimary from "../buttons/button-primary";
import { Menu, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import SideBarMenu from "../sidebars/sidebar-menu";
import { useModalMenuState } from "@/storage/menu-storage";
import { useColorModeState, useModalSearchState } from "@/storage/navbar-storage";
import { usePathname } from "next/navigation";
import { generateUUID } from "@/lib/utils/generator-uuid";
import ModalSearch from "../modals/modal-search";

const NavBar = () => {
    const [openDrop, setOpenDrop] = useState(false)
    const {openModal} = useModalMenuState()
    const ref = useOutsideClick<HTMLLIElement>(()=>setOpenDrop(false))
    const {colorMode, setModeDark, setModeLight} = useColorModeState()
    const {openModalSearch} = useModalSearchState()
    const pathName = usePathname()

    useEffect(()=>{
        if(pathName == "/posts"){
            setModeDark()
        }else setModeLight()
    }, [pathName])

    

    return ( 
        <header className={`${colorMode == "light" ? "absolute z-10 top-0" : "bg-onyx-dark"}  w-full py-2 lg:py-4`}>
            <Container className="flex justify-between items-center">
                <Logo/>
                
                <nav className="hidden lg:flex gap-8 items-center">
                    <ul className="hidden lg:flex gap-3 uppercase text-white">
                        <li>
                            <Link href={"/"} className="hover:underline">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href={"/posts"} className="hover:underline">
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link href={"/me"} className="hover:underline">
                                Mis Posts
                            </Link>
                        </li>
                        <li
                            ref={ref}
                            className="relative"
                            onMouseEnter={()=>setOpenDrop(true)}
                            onMouseLeave={()=>setOpenDrop(false)}
                        >
                                <button className="uppercase hover:underline" onClick={()=>setOpenDrop(prev=>!prev)}>
                                    Categor&iacute;as
                                </button>
                                <motion.div
                                    initial={{opacity: 0, display: "none"}}
                                    animate={openDrop ? {opacity: 1, display: "grid"} : {opacity: 0, display: "none"}}
                                    transition={{duration: 0.15}}
                                    className="absolute z-20 border-2 border-slate-e rounded-sm translate-y-2 left-1/2 transform -translate-x-1/2 bg-white p-4 origin-center text-onyx-dark w-max grid grid-cols-3 gap-8 before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-white"
                                >
                                    {Array.from({length: 5}).map((_, j)=>(
                                        <motion.ul key={j} className="space-y-1 text-sm">
                                            {Array.from({length: 5}).map((_, i)=>(
                                                <li key={generateUUID()}>
                                                    <Link href={"/posts?category=education"} className="hover:underline">
                                                        Education
                                                    </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    ))}
                                </motion.div>
                        </li>
                        <li>
                            <Link href={"/contact"}>
                                Contacto
                            </Link>
                        </li>
                    </ul>

                    <div className="font-sansita flex justify-center items-center uppercase space-x-4">
                        <button onClick={openModalSearch} className="text-white border-solid border-transparent p-1 rounded-full transition-all hover:border-white border-2">
                            <Search size={22} />
                        </button>
                        <Link href={"login"} >
                            <ButtonOutline className="uppercase text-white border-white">
                                Login
                            </ButtonOutline>
                        </Link>
                        <Link href={"register"} >
                            <ButtonPrimary className={`${colorMode == "light" ? "bg-onyx-dark text-white" : "bg-white border-white text-onyx-dark"} uppercase`}>
                                Register
                            </ButtonPrimary>
                        </Link>
                    </div>
                </nav>

                <button onClick={openModal} className="block lg:hidden">
                    <Menu size={30} className="text-white p-[2px] transition-all cursor-pointer border-solid border-transparent hover:border-white rounded-md border-2"/>
                </button>
            </Container>
            <SideBarMenu/>
            <ModalSearch/>
        </header>
     );
}
 
export default NavBar;