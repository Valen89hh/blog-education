/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Container from "@/components/containers/container";
import Logo from "../ui/logo";
import Link from "next/link";
import ButtonOutline from "../buttons/button-outline";
import ButtonPrimary from "../buttons/button-primary";
import { Heart, LogOut, Menu, Newspaper, NotebookText, Search, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import SideBarMenu from "../sidebars/sidebar-menu";
import { useModalMenuState } from "@/storage/menu-storage";
import { useColorModeState, useModalSearchState } from "@/storage/navbar-storage";
import { usePathname } from "next/navigation";
import { generateUUID } from "@/lib/utils/generator-uuid";
import ModalSearch from "../modals/modal-search";
import { ROUTES_NAVBAR_MODE_DARK, ROUTES_NOT_LAYOUT } from "@/constants/routes";
import { User } from "@supabase/supabase-js";
import { useProfileState } from "@/storage/auth-storage";
import { getProfileById } from "@/actions/auht-actions";
import Image from "next/image";
import { signOut } from "@/app/(auth)/actions";
import { Category } from "@/lib/supabase/table-type";
import { getCategories } from "@/app/create-post/actions";
import CardAnimation from "../animations/card-animation";
import { chunkArray } from "@/lib/utils/helpers";

const NavBar = ({user}: {user: User | null}) => {
    const [openDrop, setOpenDrop] = useState(false)
    const [openDashboard, setOpenDashboard] = useState(false)
    const refDash = useOutsideClick<HTMLDivElement>(()=>setOpenDashboard(false))
    const {openModal} = useModalMenuState()
    const ref = useOutsideClick<HTMLLIElement>(()=>setOpenDrop(false))
    const {colorMode, setModeDark, setModeLight} = useColorModeState()
    const {openModalSearch} = useModalSearchState()
    const pathName = usePathname()
    const {profile, loadingProfile, setLoadingProfile,setProfile} = useProfileState()
    const [categories, setCategories] = useState<Category[]>([])
    const [loadingCategories, startLoadingCategories] = useTransition()

    useEffect(()=>{
        startLoadingCategories(async()=>{
            const result = await getCategories()
            if(result.success) setCategories(result.data)
        })
    }, [])

    useEffect(()=>{
        const isDarkMode = ROUTES_NAVBAR_MODE_DARK.some(route => {
            if (route.exact) {
                // Si la ruta debe coincidir exactamente
                return pathName === route.path;
            } else {
                // Si se permite cualquier subruta
                return pathName.startsWith(route.path);
            }
        });
    
        if (isDarkMode) {
            setModeDark();
        } else {
            setModeLight();
        }
    }, [pathName])


    useEffect(()=>{
        async function getProfile(idUser: string) {
            setLoadingProfile(true)
            const result = await getProfileById(idUser)
            if(result.success) setProfile(result.data)
            else setProfile(null)
            setLoadingProfile(false)
        }
        
        if(user){
            getProfile(user.id)
        }
    }, [user])


    if(ROUTES_NOT_LAYOUT.some(route=>pathName.startsWith(route))) return null
    

    return ( 
        <header className={`${colorMode == "light" ? "absolute z-10 top-0 py-2 lg:py-4" : "bg-onyx-dark py-3"}  w-full `}>
            <Container className="flex justify-between items-center">
                <Logo size={colorMode == "light" ? 1 : 0.7}/>
                
                <nav className="hidden lg:flex gap-8 items-center">
                    <ul className="hidden lg:flex gap-3 uppercase text-white">
                        <li>
                            <Link href={"/"} className="hover:underline">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href={"/posts/category/all/1"} className="hover:underline">
                                Posts
                            </Link>
                        </li>
                        <li
                            ref={ref}
                            className="relative"
                            onMouseEnter={()=>{
                                setOpenDrop(true)
                                setOpenDashboard(false)
                            }}
                            onMouseLeave={()=>setOpenDrop(false)}
                        >
                                <button className="uppercase hover:underline">
                                    Categor&iacute;as
                                </button>
                                <motion.div
                                    initial={{opacity: 0, display: "none"}}
                                    animate={openDrop ? {opacity: 1, display: "grid"} : {opacity: 0, display: "none"}}
                                    transition={{duration: 0.15}}
                                    className="absolute z-20 border-2 border-slate-e rounded-sm translate-y-2 left-1/2 transform -translate-x-1/2 bg-white p-4 origin-center text-onyx-dark w-max grid grid-cols-2 gap-8 before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-white"
                                >
                                    {loadingCategories ? Array.from({length: 5}).map((_, i)=><CardAnimation className="w-full h-10" key={"card-anim-category-"+i}/>)
                                    : chunkArray(categories, 5).map((chunk, index) => (
                                        <motion.ul className="space-y-1 text-sm" key={`category-section-${index}`}>
                                            {chunk.map((category) => (
                                                <li key={category.category_slug}>
                                                <Link href={`/posts/category/${category.category_slug}/1`} className="hover:underline">
                                                    {category.category_name}
                                                </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                        ))
                                    }
                                    
                                    
                                </motion.div>
                        </li>
                        <li>
                            <Link href={"/about-us"}>
                                Sobre Nosotros
                            </Link>
                        </li>
                    </ul>

                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={openModalSearch} className="text-white border-solid border-transparent p-1 rounded-full transition-all hover:border-white border-2">
                            <Search size={22} />
                        </button>
                        {loadingProfile ? (
                            <motion.div
                            className="animate-pulse bg-gray-100 rounded-full h-8 w-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >
                            </motion.div>
                        ): <>
                            {profile ? (
                            <div className="relative" ref={refDash}>
                                <button onClick={()=>setOpenDashboard(prev=>!prev)} className="">
                                    <Image
                                        src={profile.avatar_url ?? "/user-none.svg"}
                                        alt={profile.name}
                                        width={400}
                                        height={400}
                                        className="h-8 w-8 object-cover rounded-full"
                                    />
                                </button>
                                <AnimatePresence>
                                    {openDashboard && (
                                        <motion.div 
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            className="absolute px-4 shadow-sm  mt-1 rounded-sm border-solid border-2 border-slate-c left-full -translate-x-full bg-white z-20">
                                            <ul >
                                                <li className="py-4 px-1 border-solid border-b-2 border-slate-c">
                                                    <h4 className="font-medium leading-3">{profile.name}</h4>
                                                    <span className="text-sm">{profile.email}</span>
                                                </li> 
                                                <li onClick={()=>setOpenDashboard(false)} >
                                                    <Link href={"/dashboard/posts"} className="hover:underline py-2 mt-4 px-1 flex items-center gap-1">
                                                        <Newspaper className="text-ash-gray" size={20}/>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li onClick={()=>setOpenDashboard(false)} >
                                                    <Link href={"/dashboard/favorites"} className="hover:underline py-2 px-1 flex items-center gap-1">
                                                        <Heart className="text-ash-gray" size={20}/>
                                                        Favoritos
                                                    </Link>
                                                </li>
                                                <li onClick={()=>setOpenDashboard(false)} >
                                                    <Link href={"/create-post"} className="hover:underline py-2 px-1 flex items-center gap-1">
                                                        <NotebookText className="text-ash-gray" size={20}/>
                                                        Crear Post
                                                    </Link>
                                                </li>
                                                <li onClick={()=>setOpenDashboard(false)} >
                                                    <Link href={"/dashboard/settings"} className="hover:underline mb-4 py-2 px-1 flex items-center gap-1">
                                                        <Settings className="text-ash-gray" size={20}/>
                                                        Configuraci&oacute;n
                                                    </Link>
                                                </li>
                                                <li onClick={async()=>{
                                                    await signOut()
                                                    setOpenDashboard(false)
                                                }}
                                                 >
                                                    <button className="hover:underline w-full py-4 border-solid border-t-2 border-slate-c px-1 flex items-center gap-1">
                                                        <LogOut className="text-ash-gray" size={20}/>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ): (
                            <>
                                <Link href={"/login"} >
                                    <ButtonOutline className="uppercase font-sansita text-white border-white">
                                        Login
                                    </ButtonOutline>
                                </Link>
                                <Link href={"/register"} >
                                    <ButtonPrimary className={`${colorMode == "light" ? "bg-onyx-dark text-white" : "bg-white border-white text-onyx-dark"} font-sansita uppercase`}>
                                        Register
                                    </ButtonPrimary>
                                </Link>
                            </>
                        )}
                        </> }
                        
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