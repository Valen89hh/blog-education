"use client"

import { useModalMenuState } from "@/storage/menu-storage";
import { AnimatePresence, motion } from "framer-motion";
import LogoDark from "../ui/logo-dark";
import { Heart, LogOut, MoveLeft, Newspaper, NotebookText, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import ButtonOutline from "../buttons/button-outline";
import ButtonPrimary from "../buttons/button-primary";
import useNoScroll from "@/hooks/use-not-scroll";
import { useModalSearchState } from "@/storage/navbar-storage";
import { useProfileState } from "@/storage/auth-storage";
import Image from "next/image";
import { signOut } from "@/app/(auth)/actions";
import { Category } from "@/lib/supabase/table-type";
import { getCategories } from "@/app/create-post/actions";
import CardAnimation from "../animations/card-animation";


const SideBarMenu = () => {
    const {closeModal, isOpenModal} = useModalMenuState()
    const [isOpenCategories, setIsOpenCategories] = useState(false)
    const [isOpenDashboard, setIsOpenDashboard] = useState(false)
    const {openModalSearch} = useModalSearchState()
    const {profile, loadingProfile} = useProfileState()
    const [categories, setCategories] = useState<Category[]>([])
    const [loadingCategories, startLoadingCategories] = useTransition()
    useNoScroll(isOpenModal)

    useEffect(()=>{
        startLoadingCategories(async()=>{
            const result = await getCategories()
            if(result.success) setCategories(result.data)
        })
    }, [])

    
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
                            <ul className="">
                                <li onClick={closeModal}>
                                    <Link href={"/"} className="hover:underline uppercase">
                                        Inicio
                                    </Link>
                                </li>
                                <li onClick={closeModal}>
                                    <Link href={"/posts/category/all/1"} className="hover:underline uppercase">
                                        Posts
                                    </Link>
                                </li>
                                <li>
                                    <button className="uppercase hover:underline" onClick={()=>setIsOpenCategories(true)}>
                                        Categor&iacute;as
                                    </button>
                                </li>
                                <li className=" mt-2 flex gap-4 items-center ">
                                    
                                    {loadingProfile ? (
                                            <motion.div
                                            className="animate-pulse  flex items-center gap-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            >
                                                <div className="rounded-full h-8 w-8 bg-gray-100"></div>
                                                <div className="rounded-md h-5 w-20 bg-gray-100"></div>
                                            </motion.div>
                                        ): 
                                    <>
                                        {profile ? (
                                            <div className="">
                                                <button className="flex items-center gap-2" onClick={()=>setIsOpenDashboard(prev=>!prev)}>
                                                    <Image
                                                        src={profile.avatar_url ?? "/user-none.svg"}
                                                        alt={profile.name}
                                                        width={400}
                                                        height={400}
                                                        className="h-6 w-6 object-cover rounded-full"
                                                    />
                                                    <span>{profile.name}</span>
                                                </button>
                                                <AnimatePresence>
                                                    {isOpenDashboard && (

                                                        <motion.div className="overflow-hidden">
                                                            <motion.ul
                                                                initial={{y: "-100%"}}
                                                                animate={{ y: 0} }
                                                                exit={{y: "-100%"}}
                                                                transition={{type: "tween"}}
                                                                className="px-6 space-y-2 pt-2"
                                                            >
                                                                <li onClick={closeModal} >
                                                                    <Link href={"/dashboard/posts"} className="hover:underline flex items-center gap-1">
                                                                        <Newspaper className="text-ash-gray" size={20}/>
                                                                        Dashboard
                                                                    </Link>
                                                                </li>
                                                                <li onClick={closeModal} >
                                                                    <Link href={"/dashboard/favorites"} className="hover:underline flex items-center gap-1">
                                                                        <Heart className="text-ash-gray" size={20}/>
                                                                        Favoritos
                                                                    </Link>
                                                                </li>
                                                                <li onClick={closeModal} >
                                                                    <Link href={"/create-post"} className="hover:underline flex items-center gap-1">
                                                                        <NotebookText className="text-ash-gray" size={20}/>
                                                                        Crear Post
                                                                    </Link>
                                                                </li>
                                                                <li onClick={closeModal} >
                                                                    <Link href={"/dashboard/settings"} className="hover:underline flex items-center gap-1">
                                                                        <Settings className="text-ash-gray" size={20}/>
                                                                        Configuraci&oacute;n
                                                                    </Link>
                                                                </li>
                                                                <li onClick={async()=>{
                                                                    await signOut()
                                                                    closeModal()
                                                                    
                                                                }} >
                                                                    <button className="hover:underline flex items-center gap-1">
                                                                        <LogOut className="text-ash-gray" size={20}/>
                                                                        Logout
                                                                    </button>
                                                                </li>
                                                                
                                                            </motion.ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ): (
                                            <>
                                                <Link href={"/login"} >
                                                    <ButtonOutline className="uppercase font-sansita text-onyx-dark border-onyx-dark">
                                                        Login
                                                    </ButtonOutline>
                                                </Link>
                                                <Link href={"/register"} >
                                                    <ButtonPrimary className="uppercase font-sansita">
                                                        Register
                                                    </ButtonPrimary>
                                                </Link>
                                            </>
                                        )}
                                    </> 
                                    }
                                    
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
                                                {loadingCategories ? Array.from({length: 5}).map((_, i)=><CardAnimation className="h-10 w-full" key={"card-anim-"+i}/>)
                                                : 
                                                    categories.map((category)=>(
                                                        <li onClick={()=>{
                                                            closeModal()
                                                            setIsOpenCategories(false)
                                                        }} key={"cat-"+category.id}>
                                                            <Link className="uppercase hover:underline" href={`/posts/category/${category.category_slug}/1`}>
                                                                {category.category_name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
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