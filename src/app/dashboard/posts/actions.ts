"use server"

import { createClient } from "@/lib/supabase/server"
import { Post, PostForTable, PostRpc } from "@/lib/supabase/table-type"
import { getRangePage } from "@/lib/utils/helpers"
import { Result } from "@/lib/utils/response"

const supabase = createClient()

export const getTotalPostSharedsByUser = async(idUser: string): Promise<Result<number>>=>{
    const {
        data: posts,
        error
    } = await supabase
        .from("posts")
        .select("shareds")
        .eq("author_id", idUser)

    if(error) return {success: false, error: error.message}
    if(!posts) return {success: false, error: "No se encontraron los posts"}

    return {
        success: true,
        data: posts.length > 0 ? posts.map(pt=>pt.shareds).reduce((prev, curr)=>prev+curr) : 0
    }
}

export const getTotalPostViewsByUser = async(idUser: string): Promise<Result<number>>=>{
    const {
        data: posts,
        error
    } = await supabase
        .from("posts")
        .select("views")
        .eq("author_id", idUser)

    if(error) return {success: false, error: error.message}
    if(!posts) return {success: false, error: "No se encontraron los posts"}

    return {
        success: true,
        data: posts.length > 0 ? posts.map(pt=>pt.views).reduce((prev, curr)=>prev+curr) : 0
    }
}

export const getTotalCommentsByUser = async(idUser: string): Promise<Result<number>>=>{
    const {
        data: posts,
        error
    } = await supabase
        .from("posts")
        .select("id")
        .eq("author_id", idUser)

    if(error) return {success: false, error: error.message}
    if(!posts) return {success: false, error: "No se encontraron los posts"}

    try{
        const total = await Promise.all(
            posts.map(async(post)=>{
                const {
                    error: errorComments,
                    count
                } = await supabase
                    .from("comments")
                    .select("*", {count: "exact"})
                    .eq("post_id", post.id)

                if(errorComments) throw new Error(errorComments.message)
                return count ?? 0
            })
        )

        return {
            success: true,
            data: total.reduce((prev, curr)=>prev+curr)
        }
    }catch(error){
        if(error instanceof Error){
            return {success: false, error: error.message}
        }else{
            return {success: false, error: "Ocurrio un erros inesperado"}
        }
    }
}

export type FilterOptionPost = "all" | "views" | "comments" | "shareds" | "draft" | "published"

interface OptionFilterPost{
    search: string | null,
    filter: FilterOptionPost
}

interface ResultPosts{
    posts: PostRpc[],
    count: number
}

export const getPostsByUser = async(idUser: string, page: number = 1, itemPerPage: number = 10, filterOptions: OptionFilterPost = {search: null, filter: "all"}): Promise<Result<ResultPosts>> => {
    const { 
        data: posts, 
        error 
    } = await supabase
        .rpc('get_posts_by_user', {
            search: filterOptions.search ?? "",
            filter: filterOptions.filter,
            user_id: idUser,
            page_number: page,
            items_per_page: itemPerPage
        })
    if(error) return {success: false, error: error.message}
    if(!posts) return {success: false, error: "No se encontraron post concidentes"}

    return {
        success: true,
        data: {
            posts: posts,
            count: posts.length > 0 ? posts[0].total_count : 0
        }
    }
};


export const userHavePosts = async(idUser: string): Promise<boolean>=>{
    const {
        error, 
        count
    } = await supabase
        .from("posts")
        .select("*", {count: "exact", head: true})
        .eq("author_id", idUser)
    
    if(error) return false
    if(!count) return false

    return count > 0
}
