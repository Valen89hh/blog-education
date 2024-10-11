"use client"

import ButtonOutline from "@/components/buttons/button-outline";
import CardMainPost from "@/components/cards/card-main-post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Posts = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(()=>{
        router.push(`?page=${page}?search=${search}`,{scroll: false})
    }, [page, search])

    const handlePage = ()=>{
        setPage(prev=>prev+1)
    }

    return ( 
        <section className="space-y-2 my-[4rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({length: 6}).map((_, i)=>(
                    <CardMainPost key={"post-"+i}/>
                ))}
            </div>
            <div className="flex justify-center items-center">
                <ButtonOutline onClick={handlePage}>
                    Load More {page}
                </ButtonOutline>
            </div>
            <input placeholder="Search" type="text" value={search} onChange={e=>setSearch(e.target.value)} />
        </section>
     );
}
 
export default Posts;