import { useModalMenuState } from "@/storage/menu-storage";
import { AnimatePresence, motion } from "framer-motion";
import LogoDark from "../ui/logo-dark";
import { MoveLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonOutline from "../buttons/button-outline";
import ButtonPrimary from "../buttons/button-primary";
import useNoScroll from "@/hooks/use-not-scroll";
import { useModalSearchState } from "@/storage/navbar-storage";


const SideBarMenu = () => {
    const {closeModal, isOpenModal} = useModalMenuState()
    const [isOpenCategories, setIsOpenCategories] = useState(false)
    const {openModalSearch} = useModalSearchState()
    useNoScroll(isOpenModal)

    
    return ( 
        <AnimatePresence>
            {isOpenModal && (
                <motion.div 
                    key={"modal"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed overflow-hidden h-screen inset-0 bg-black bg-opacity-20 z-40"
                >
                    <motion.aside
                        initial={{ x: 100}}
                        animate={{ x: 0}}
                        exit={{ x: 100 }}
                        transition={{ type: "tween" }}
                        className=" bg-white absolute top-0 right-0 h-full max-w-[25rem] w-[80%]"
                    >
                        <div className="flex bg-onyx-dark px-4 py-1 justify-between items-center">
                            <LogoDark size={1}/> 

                            <div className="flex items-center">
                                <button onClick={()=>{
                                    closeModal()
                                    openModalSearch()
                                }} className="text-white border-solid border-transparent p-1 rounded-full transition-all hover:border-white border-2">
                                    <Search size={22} />
                                </button>
                                <button onClick={closeModal} className="text-white border-solid border-transparent p-1 rounded-full transition-all hover:border-white border-2">
                                    <X size={22}/>
                                </button>
                            </div>
                        </div>
                        <div className="px-4 h-full relative py-2 overflow-hidden">
                            <ul className="uppercase">
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
                                <li>
                                    <button className="uppercase hover:underline" onClick={()=>setIsOpenCategories(true)}>
                                        Categor&iacute;as
                                    </button>
                                </li>
                                <li className="font-sansita mt-4 flex gap-4 items-center uppercase ">
                                    <Link href={"login"} >
                                        <ButtonOutline className="uppercase text-onyx-dark border-onyx-dark">
                                            Login
                                        </ButtonOutline>
                                    </Link>
                                    <Link href={"register"} >
                                        <ButtonPrimary className="uppercase">
                                            Register
                                        </ButtonPrimary>
                                    </Link>
                                </li>
                            </ul>
                            <AnimatePresence>

                                {isOpenCategories && (
                                    <motion.div 
                                        initial={{x: "100%"}}
                                        animate={{x: 0}}
                                        exit={{x: "100%"}}
                                        transition={{duration: 0.3, type: "tween"}}
                                        className="bg-white px-4 py-2 absolute inset-0 h-full">
                                            <button className="text-onyx-dark" onClick={()=>setIsOpenCategories(false)}>
                                                <MoveLeft/>
                                            </button>
                                            <ul className="space-y-1">
                                                {Array.from({length: 10}).map((_, i)=>(
                                                    <li key={"cat-"+i}>
                                                        <Link className="uppercase hover:underline" href={"/posts?category=education"}>
                                                            Category + {i}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
     );
}
 
export default SideBarMenu;