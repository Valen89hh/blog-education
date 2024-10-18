"use client"

import { Post, PostForTable, PostRpc } from "@/lib/supabase/table-type";
import { useProfileState } from "@/storage/auth-storage";
import { useEffect, useState, useTransition } from "react";
import { FilterOptionPost, getPostsByUser, userHavePosts } from "../actions";
import toast from "react-hot-toast";
import CardAnimation from "@/components/animations/card-animation";
import TablePosts from "./table-posts";
import CardNonePosts from "./card-none-posts";
import SearchPost from "./search-post";
import FilterPosts from "./filter-posts";
import Pagination from "@/components/widgets/pagination";
import useQuery from "@/hooks/use-query";
import { isNumber } from "@/lib/utils/regex";
import { getRangePage } from "@/lib/utils/helpers";
import { useSearchParams } from "next/navigation";
import Card from "@/components/cards/card";

const  ITEM_PER_PAGE = 5


const PostsCreateds = () => {
    const {profile} = useProfileState()
    const searchParams = useSearchParams()
    const [resultsPagination, setResultPagination] = useState({from: 0, to: 0})
    const [posts, setPosts] = useState<PostRpc[]>([])
    const [firtRender, setFirstRender] = useState(true)
    const [havePosts, setHavePosts] = useState(false)
    const [countTable, setCountTable] = useState<number>(50)
    const [loadingPosts, startLoadingPosts] = useTransition()

    useEffect(()=>{
        async function isHavePosts(idUser: string) {
            const result = await userHavePosts(idUser)
            setHavePosts(result)
        }

        if(profile){
            isHavePosts(profile.id)
        }
    }, [profile])


    useEffect(()=>{
        const pageQuery = searchParams.get("page") ?? "1"
        if(isNumber(pageQuery)){
            const page = parseInt(pageQuery)
            const search = searchParams.get("search")
            const filter = (searchParams.get("filter") ?? "all") as FilterOptionPost
            if(profile){
                startLoadingPosts(async()=>{
                    const result = await getPostsByUser(profile.id, page, ITEM_PER_PAGE, {
                        search,
                        filter
                    })
                    console.log(result)
                    if(result.success) {
                         // Calcular el rango de `from` y `to`
                        const from = (page - 1) * ITEM_PER_PAGE + 1;
                        const to = Math.min(page * ITEM_PER_PAGE, result.data.count); 
                        setResultPagination({ from, to });
                        setPosts(result.data.posts)
                        setCountTable(result.data.count)
                    }
                    else toast.error(result.error)
                    setFirstRender(false)
                })
            }
        }
    }, [searchParams, profile])

    
    return <div className="space-y-6">
        {firtRender ? (
            <div className="flex flex-wrap justify-between">
                <CardAnimation className="h-10 w-[30%]"/>
                <CardAnimation className="h-10 w-[20%]"/>
            </div>
        ): (
            <div className="flex flex-wrap justify-between">
                <SearchPost/>
                <FilterPosts/>
            </div>
        )}
        {loadingPosts? (
            <CardAnimation className="h-[20rem]"/>
        ): 
            (posts.length > 0) ? (
                <>
                    <TablePosts posts={posts}/>
                    <div className="flex flex-wrap items-center justify-between">
                        <p>Showing {resultsPagination.from} to {resultsPagination.to} of {countTable} results</p>
                        <Pagination mountPerPage={ITEM_PER_PAGE} mountTotal={countTable}/>
                    </div>
                
                </>
            ): !havePosts ? (
                <CardNonePosts/>
            ) : (
                <Card className="h-[20rem] w-full inline-flex justify-center items-center">
                    <p className="text-center">No se encontraron los posts que buscas</p>
                </Card>
            )
        }
    </div>

}
 
export default PostsCreateds;