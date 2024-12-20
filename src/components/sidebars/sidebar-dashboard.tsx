"use client"

import { capitalizeFirstLetter } from "@/lib/utils/formatter-string";
import { Heart, Newspaper, NotebookText, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const baseRoute = "/dashboard"

const routes_dashboard = [
    {
        id: 1,
        route: "posts",
        route_link: baseRoute+"/posts",
        icon: <Newspaper size={20}/>
    },
    {
        id: 2,
        route: "favoritos",
        route_link: baseRoute+"/favourites",
        icon: <Heart size={20}/>
    },
    {
        id: 3,
        route: "crear post",
        route_link: baseRoute+"/create-post",
        icon: <NotebookText size={20}/>
    },
    {
        id: 4,
        route: "configuración",
        route_link: baseRoute+"/settings",
        icon: <Settings size={20}/>
    },
]

interface SideBarDashboardProps{
    className?: string
}

const SideBarDashboard: React.FC<SideBarDashboardProps> = ({
    className
}) => {
    const [routeSelect, setRouteSelect] = useState(1)
    const pathName = usePathname()

    useEffect(()=>{
        const rt = routes_dashboard.find(rt=>pathName.startsWith(rt.route_link))
        if(rt) setRouteSelect(rt.id)
    }, [pathName])


    return ( 
        <aside className={twMerge("min-w-[25%] space-y-4", className)}>
            <TitleDashboard/>
            <ul>
                {routes_dashboard.map((rt=>(
                    <li className={`rounded-ms hover:underline transition-all duration-150 py-1 px-2 border-solid border-2  ${routeSelect == rt.id ? "bg-white text-onyx-dark font-medium border-slate-e" : "font-normal text-ash-gray bg-transparent border-transparent"}`} onClick={()=>setRouteSelect(rt.id)} key={rt.route_link}>
                        <Link className="flex items-center gap-1" href={rt.route_link}>
                            {rt.icon}
                            {capitalizeFirstLetter(rt.route)}
                        </Link>
                    </li>
                )))}
            </ul>
        </aside>
     );
}
 
export default SideBarDashboard;


export const TitleDashboard = ({className}: {className?: string}) => {
    const pathName = usePathname()
    const [title, setTitle] = useState(routes_dashboard[0].route)
    useEffect(()=>{
        const rt = routes_dashboard.find(rt=>pathName.startsWith(rt.route_link))
        if(rt) setTitle(rt.route)
    }, [pathName])
    return ( 
        <h2 className={twMerge("text-2xl font-medium", className)}>{capitalizeFirstLetter(title)}</h2>
     );
}
 