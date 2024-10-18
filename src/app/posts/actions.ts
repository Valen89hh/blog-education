"use server"

import { createClient } from "@/lib/supabase/client"
import { Comment, CommentForPost, PostForShow } from "@/lib/supabase/table-type"
import { extractTextFromHTMLString } from "@/lib/utils/formatter-string"
import { getRangePage } from "@/lib/utils/helpers"
import { Result } from "@/lib/utils/response"


const supabase = createClient()

export const getPostServer = async(idPost: number)=>{
    const {
        data: post,
        error
    } = await supabase
        .from("posts")
        .select("*, categories(category_name), profiles(name, avatar_url)")
        .eq("status", "published")
        .eq("id", idPost)
        .maybeSingle()

    if(error) return null
    return post
}

export const getPostsServer = async()=>{
    const {
        data: posts,
        error
    } = await supabase
        .from("posts")
        .select("id")
        .eq("status", "published")

    if(error) return []
    return posts || []
}

interface ResultPostPagination{
    posts: PostForShow[]
    count: number
}

export const getPostPagination = async(page: number = 1, itemPerPage: number = 5, categorySlug: string = ""): Promise<Result<ResultPostPagination>>=>{
    const {from, to} = getRangePage(page, itemPerPage)
    console.log("La cateogria: ",categorySlug)

    const query = supabase
        .from("posts")
        .select("*, categories(category_name), profiles(name, avatar_url)", {count: "exact"})
        .range(from, to)
        .eq("status", "published") // Solo posts publicados

    // Filtrar por el nombre de la categoría si se ha proporcionado
    if (categorySlug) {
        const {
            data: dataCategory,
            error: errorCategory
        } = await supabase
            .from("categories")
            .select("id")
            .eq("category_slug", categorySlug)
            .maybeSingle()
        if(errorCategory) return {success: false, error: errorCategory.message}
        if(!dataCategory) return {success: false, error: "Categoria no encontrada"}

        query.eq("category_id", dataCategory.id)
    }

    const { data: posts, error: errorPosts, count } = await query

    if (errorPosts) return { success: false, error: errorPosts.message }
    if (!posts || !count) return { success: false, error: "Posts no encontrados" }

    return {
        success: true,
        data: {
            posts: posts.map(pt => ({
                ...pt,
                authorImage: pt.profiles?.avatar_url ?? "",
                authorName: pt.profiles?.name ?? "",
                categoryName: pt.categories?.category_name ?? '',
                content: extractTextFromHTMLString(pt.content)
            })),
            count: count
        }
    }
}


interface DataCategoriesParam{
    categoryName: string,
    count: number
}

export const getCategoriesParams = async(): Promise<Result<DataCategoriesParam[]>>=>{
    const {
        data: categories,
        error: errorCatetegories,
    } = await supabase
        .from("categories")
        .select()

    if(errorCatetegories) return {success: false, error: errorCatetegories.message}
    if(!categories) return {success: false, error: "Categorias no encontradas"}
    
    return {
        success: true,
        data: []
    }
    
}

