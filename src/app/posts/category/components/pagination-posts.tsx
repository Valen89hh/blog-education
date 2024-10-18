"use client"

import Pagination from "@/components/widgets/pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";


const PaginationPosts = ({category,page, mountPerPage, mountTotal}: {category: string,page: number, mountPerPage: number, mountTotal: number}) => {
    const router = useRouter()
    console.log(page)
    return ( 
        <Pagination onSelectPage={(pageSelect)=>router.push(`/posts/category/${category}/${pageSelect}`)} 
            pageSelectValue={page}
            mountPerPage={mountPerPage} 
            mountTotal={mountTotal}
            isQueryChange={false}
        />
     );
}
 
export default PaginationPosts;