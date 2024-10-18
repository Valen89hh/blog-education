"use client"

import Card from "@/components/cards/card";
import useQuery from "@/hooks/use-query";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface SearchPostProps{
    className?: string,
}

const SearchPost: React.FC<SearchPostProps> = ({
    className
}) => {
    const {setQuery} = useQuery()

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setQuery("search", e.target.value)
    }

    return ( 
        <Card className={twMerge("flex items-center gap-2 px-2 py-1", className)}>
            <Search className="text-ash-gray" size={20}/>
            <input 
                type="text" 
                placeholder="Buscar"  
                className="outline-none w-full"
                onChange={handleChange}
            />
        </Card>
     );
}
 
export default SearchPost;