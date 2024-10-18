"use server"

import { createClient } from "@/lib/supabase/server"
import { PostForEdit } from "@/lib/supabase/table-type"
import { Result } from "@/lib/utils/response"

const supabase = createClient()

export const getPostForEdit = async(idPost: number): Promise<Result<PostForEdit>>=>{
  const {
    data: post,
    error: errorPost
  }  = await supabase
    .from("posts")
    .select()
    .eq("id", idPost)
    .maybeSingle()

  if(errorPost) return {success: false, error: errorPost.message}
  if(!post) return {success: false, error: "No se encontro el post"}

  const {
    data: category,
    error: errorCategory
  } = await supabase
    .from("categories")
    .select()
    .eq("id", post.category_id!)
    .maybeSingle()

  if(errorCategory) return {success: false, error: errorCategory.message}
  if(!category) return {success: false, error: "No se encontra una categoría asociada al post"}

  return {
    success: true,
    data: {
        ...post,
        category: category
    }
  }
}