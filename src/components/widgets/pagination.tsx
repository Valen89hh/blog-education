"use client"

import useQuery from "@/hooks/use-query";
import { calculateMountPage } from "@/lib/utils/helpers";
import { isNumber } from "@/lib/utils/regex";
import usePagination from "@mui/material/usePagination/usePagination";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PaginationProps{
    mountPerPage: number,
    mountTotal: number,
    isQueryChange?: boolean,
    onSelectPage?: (page: number)=>void,
    pageSelectValue?: number
}

const Pagination: React.FC<PaginationProps> = ({
    mountPerPage,
    mountTotal,
    isQueryChange = true,
    onSelectPage,
    pageSelectValue = 1
}) => {
    const {setQuery, getQuery} = useQuery()
    const [pageSelect, setPageSelect] = useState(pageSelectValue)

    const { items } = usePagination({
        count: calculateMountPage(mountPerPage, mountTotal),
        page: pageSelect,
        onChange: (event, newPage) => {
            if(isQueryChange){
                setQuery("page", newPage.toString())
            }
            if(onSelectPage) onSelectPage(newPage)
        }
      });
      
    useEffect(()=>{
        setPageSelect(pageSelectValue)
    }, [pageSelectValue])

    useEffect(()=>{
        if(isQueryChange){
            const pageQuery = getQuery("page") ?? "1"
            if(isNumber(pageQuery)){
                setPageSelect(parseInt(pageQuery))
            }
        }
    }, [getQuery, isQueryChange])
    
    return (
    <nav>
        <ul className='flex'>
            {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = '…';
                } else if (type === 'page') {
                children = (
                    <button
                    type="button"
                    className={`rounded-ms  border-2 border-slate-e inline-flex justify-center items-center font-bold ${selected ? "bg-onyx-dark text-white" : "bg-white hover:bg-slate-e text-onyx-dark"} h-[2rem] w-[2rem] `}
                    {...item}
                    onClick={(e) => {
                        item.onClick(e);
                    }}
                    >
                    {page}
                    </button>
                );
                } else {
                children = (
                    <button className='rounded-ms hover:bg-slate-e border-2 border-slate-e text-onyx-dark disabled:bg-gray-200 inline-flex justify-center items-center h-[2rem] w-[2rem] bg-white' type="button" {...item} onClick={(e) => {
                    item.onClick(e);
                    }} >
                    {type == "previous" && <MoveLeft size={16} />}
                    {type == "next" && <MoveRight size={16} />}
                    </button>
                );
                }

                return <li className='mx-1 text-onyx-dark' key={index}>{children}</li>;
            })}
        </ul>
    </nav>
    );
}
 
export default Pagination;