"use server"

import { createClient } from "@/lib/supabase/server"
import { Category, PostStatus } from "@/lib/supabase/table-type"
import { joinBlanks, stringToUrlSlug } from "@/lib/utils/formatter-string"
import { generateUUID } from "@/lib/utils/generator-uuid"
import { calcularTiempoLectura } from "@/lib/utils/helpers"
import { Result } from "@/lib/utils/response"
import { revalidateTag } from "next/cache"

const supabase = createClient()

export const getCategories = async(): Promise<Result<Category[]>>=>{
    const {
        data: categories,
        error
    } = await supabase
        .from("categories")
        .select()
    

    if(error) return {success: false, error: error.message}
    if(!categories) return {success: false, error: "No se pudieron obtener la categorías"}

    return {
        success: true,
        data: categories
    }
}

interface DataCreatePost{
    idCategory: number,
    author_id: string
    title: string,
    content: string,
    status: PostStatus
}

export const createPost = async(imageData: FormData, data: DataCreatePost): Promise<Result<string>>=>{
    console.log(data)
    
    if(data.status == "published" && !data.content) return {success: false, error: "El contenido es requerido"}
    
    const imageFile = imageData.get("image") as File
    if(!imageFile) return {success: false, error: "Imange no enviada"}

    const imagePath = `${joinBlanks(data.title)}/${generateUUID()}-image.${imageFile.type.split("image/")[1]}`;
    const {error: errorUplaod} = await supabase.storage.from("posts").upload(imagePath, imageFile)
    console.log(errorUplaod)
    if(errorUplaod) return {success: false, error: errorUplaod.message}

    const imgUrl = supabase.storage.from("posts").getPublicUrl(imagePath).data.publicUrl

    const {
        error: errorPost
    } = await supabase
        .from("posts")
        .insert({
            author_id: data.author_id,
            title: data.title,
            content: data.content,
            category_id: data.idCategory,
            time_read: calcularTiempoLectura(data.content),
            post_img: imgUrl,
            post_path: imagePath,
            status: data.status,
            published_at: data.status == "published" ? new Date().toISOString() : null
        })
    
    if(errorPost) return {success: false, error: errorPost.message}
    
    revalidateTag('posts')
    return {
        success: true, 
        data: "Post creado correctamente"
    }
}

interface DataUpdatePost{
    idCategory: number,
    post_id: number
    title: string,
    content: string,
    status: PostStatus,
    image_url: string,
    image_path: string
}

export const updatePost = async(imageData: FormData, data: DataUpdatePost): Promise<Result<string>>=>{
    console.log(data)
    
    if(data.status == "published" && !data.content) return {success: false, error: "El contenido es requerido"}
    
    const imageFile = imageData.get("image") as File
    let imagePath = data.image_path
    let imgUrl = data.image_url

    if(imageFile && data.image_path){
        
        imagePath = `${stringToUrlSlug(data.title)}/${generateUUID()}-image.${imageFile.type.split("image/")[1]}`;
        const {error: errorUplaod} = await supabase.storage.from("posts").upload(imagePath, imageFile)
        if(errorUplaod) return {success: false, error: errorUplaod.message}
        console.log("---IMAGEN SUBIDA CORRECTAMENTE---")
        imgUrl = supabase.storage.from("posts").getPublicUrl(imagePath).data.publicUrl

        const {error: errorRemove} = await supabase.storage.from("posts").remove([data.image_path])
        if(errorRemove) return {success: false, error: errorRemove.message}
        console.log("---IMAGEN ELIMIINADA CORRECTAMENTE---")
    }

    const {
        error: errorPost
    } = await supabase
        .from("posts")
        .update({
            title: data.title,
            content: data.content,
            category_id: data.idCategory,
            time_read: calcularTiempoLectura(data.content),
            post_img: imgUrl,
            post_path: imagePath,
            status: data.status,
            published_at: data.status == "published" ? new Date().toISOString() : null
        })
        .eq("id", data.post_id)
    
    if(errorPost) return {success: false, error: errorPost.message}

    revalidateTag('posts')
    return {
        success: true, 
        data: "Post actualizado correctamente"
    }
}