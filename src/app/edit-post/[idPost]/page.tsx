/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { PostForEdit } from "@/lib/supabase/table-type";
import { useEffect, useState, useTransition } from "react";
import { getPostForEdit } from "../actions";
import { isNumber } from "@/lib/utils/regex";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CardAnimation from "@/components/animations/card-animation";
import EditorPost from "@/app/create-post/editor-post";

const EditPostPage = ({params}: {params: {idPost: string}}) => {
    const [post, setPost] = useState<PostForEdit|null>(null)
    const [loading, startLoading] = useTransition()
    const router = useRouter()

    useEffect(()=>{
        startLoading(async()=>{
            if(isNumber(params.idPost)){
                const result = await getPostForEdit(parseInt(params.idPost))
                if(result.success) {
                    setPost(result.data)
                }else{
                    toast.error(result.error)
                    router.push("/dashboard/posts")
                }
            }else router.push("/dashboard/posts")
        })
    }, [])

    if(loading) return <CardAnimation className="w-3/4 h-[20rem] mx-auto mt-8"/>

    if(!post) return <div className="text-center w-3/4 h-[20rem] flex justify-center items-center">
        <p>No se encontro ningun post</p>
    </div>


    return ( 
        <EditorPost idPost={post.id} initialValues={{
            image: {
                imgUrl: post.post_img,
                imgPath: post.post_path,
                file: null
            },
            title: post.title,
            content: post.content,
            postStatus: post.status,
            category: post.category
        }}/>
     );
}
 
export default EditPostPage;