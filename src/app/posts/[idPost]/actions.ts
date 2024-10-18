"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as _createClient } from "@/lib/supabase/client"
import { Comment, CommentForPost, Post, PostRelated } from "@/lib/supabase/table-type"
import { extractTextFromHTMLString } from "@/lib/utils/formatter-string"
import { Result } from "@/lib/utils/response"

export const updateViewsPost = async(idPost: number, views: number): Promise<Result<string>>=>{
    const supabase = createClient()

    const {error} = await supabase.from("posts").update({views: views+1}).eq("id", idPost)
    if(error) return {success: false, error: error.message}
    return {
        success: true,
        data: "vistas actualizadas correctamente"
    }
}


export const getCommentsByPost = async(idPost: number): Promise<Result<CommentForPost[]>>=>{
    const supabase = createClient()
    const {
        data: comments,
        error: errorComments
    } = await supabase
        .from("comments")
        .select("*, profiles(avatar_url, name)")
        .eq("post_id", idPost)

    if(errorComments) return {success: false, error: errorComments.message}
    if(!comments) return {success: false, error: "Comentarios no encontrados"}

    return {
        success: true,
        data: comments.map(comment=>({
            ...comment,
            authorImg: comment.profiles?.avatar_url ?? "",
            authorName: comment.profiles?.name ?? "",
        }))
    }
}

export const createCommentForPost = async(idPost: number, idUser: string, content: string): Promise<Result<Comment>>=>{
    const supabase = createClient()

    const {
        data: comment,
        error: errorComment
    } = await supabase
        .from("comments")
        .insert({
            author_id: idUser,
            post_id: idPost,
            content: content
        })
        .select()
        .maybeSingle()

    if(errorComment) return {success: false, error: errorComment.message}
    if(!comment) return {success: false, error: "No se pudo obtener el comentario"}

    return {
        success: true,
        data: comment
    }

}

export const getPostRelated = async(idCategory: number): Promise<Result<PostRelated[]>>=>{
    const supabase = _createClient()
    const {
        data: posts,
        error: errorPost
    } = await supabase
        .from("posts")
        .select("*, categories(category_name)")
        .eq("category_id", idCategory)
        .eq("status", "published")
        .limit(10)

    if(errorPost) return {success: false, error: errorPost.message}
    if(!posts) return {success: false, error: "No hay posts relacionados"}

    return {
        success: true,
        data: posts.map(pt=>({...pt, categoryName: pt.categories?.category_name ?? "", content: extractTextFromHTMLString(pt.content)}))
    }
}

export const getLatestPosts = async(): Promise<Result<Post[]>>=>{
    const supabase = createClient()
    const {
        data: posts,
        error: errorPosts
    } = await supabase
        .from("posts")
        .select()
        .eq("status", "published")
        .order("published_at", {ascending: false})
        .limit(3)

    if(errorPosts) return {success: false, error: errorPosts.message}
    if(!posts) return {success: false, error: "No hay posts recientes"}

    return {
        success: true,
        data: posts
    }
}

export const updateSharedsPost = async(idPost: number): Promise<Result<string>>=>{
    const supabase = createClient()
    const {
        data: post,
        error: errorPost
    } = await supabase
        .from("posts")
        .select("shareds")
        .eq("id", idPost)
        .maybeSingle()
    
    if(errorPost) return {success: false, error: errorPost.message}
    if(!post) return {success: false, error: "No se encontro el post"}

    const {
        error: errorUpdate
    } = await supabase
        .from("posts")
        .update({
            shareds: post.shareds + 1
        })
        .eq("id", idPost)
    
    if(errorUpdate) return {success: false, error: errorUpdate.message}

    return {
        success: true,
        data: "Shared actualizado correctamente"
    }
}