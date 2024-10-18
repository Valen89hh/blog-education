"use client"

import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Logo from "@/components/ui/logo";
import { Comment, CommentForPost } from "@/lib/supabase/table-type";
import { useProfileState } from "@/storage/auth-storage";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import CardAnimation from "@/components/animations/card-animation";
import { useFormFields, Validators } from "@/hooks/use-form-field";
import { createCommentForPost, getCommentsByPost } from "../actions";
import Link from "next/link";
import SharePost from "./share-post";
import { useModalShareState } from "@/storage/modal-share-post";

interface CommentSchema{
    comment: string
}

const validators: Validators<CommentSchema> = {
    comment: (value)=> !value ? "El comentario es requerido" : null
}

const Comments = ({idPost}: {idPost: number}) => {
    const {profile} = useProfileState()
    const [comments, setComments] = useState<CommentForPost[]>([])
    const [loadingComment, startLoadingComment] = useTransition()
    const [loading, startLoading] = useTransition()
    const [openComment, setOpenComment] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const {openModalSharePost} = useModalShareState()
    const {fields, setFieldValue, handleSubmit, setFieldError} = useFormFields<CommentSchema>({comment: ""}, validators)

    useEffect(()=>{
        startLoading(async()=>{
            const result = await getCommentsByPost(idPost)
            if(result.success) setComments(result.data)
        })
    }, [idPost])

    const onSubmit = (data: CommentSchema)=>{
        console.log(data)
        if(profile){
            startLoadingComment(async()=>{
                const result = await createCommentForPost(idPost, profile.id, data.comment)
                if(result.success) setComments(prev=>[...prev, {...result.data, authorImg: profile.avatar_url ?? "", authorName: profile.name}])
                else setFieldError("comment", result.error)
            })
        }
    }

    return ( 
        <div className="mt-[2rem]">
            <div className="flex gap-4">
                <ButtonOutline onClick={openModalSharePost} className="w-full flex items-center justify-center gap-2 uppercase">
                    <Share2/>
                    Share
                </ButtonOutline>
                <ButtonPrimary onClick={()=>setOpenComment(prev=>!prev)} className="w-full flex items-center justify-center gap-2 uppercase">
                    <MessageSquareText/>
                    Comments ({comments.length})
                </ButtonPrimary>
            </div>
            <AnimatePresence>
                {openComment && (
                    <motion.div
                        className="mt-8"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1, display: "block"}}
                        exit={{height: 0, opacity: 0}}
                    >
                        {loading 
                        ? <Card className="p-6">
                            <ul className="space-y-8">
                                {Array.from({length: 5}).map((_, i)=>(
                                    <li key={"comment-"+i}>
                                        <CardAnimation className="h-7 w-7 rounded-full" />
                                        <CardAnimation className="w-full h-[10rem]"/>
                                    </li>
                                ))}
                            </ul>

                        </Card>
                        :<Card className="p-6 space-y-8">
                            <ul className="max-h-[40rem] p-2 overflow-y-auto space-y-8">
                                {comments.length == 0 && (<li>
                                    <p className="w-full text-center">Se el primero en comentar este post</p>
                                </li>)}
                                {comments.map((comment)=>(
                                    <li key={"comment-"+comment.id} className="flex gap-2">
                                        <Image
                                            src={comment.authorImg ? comment.authorImg : "/user-none.svg"}
                                            alt={comment.authorName}
                                            width={4000}
                                            height={4000}
                                            className="h-7 w-7 rounded-full object-cover"
                                        />

                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium">{comment.authorName}</h3>
                                                <span className="text-slate-gray text-sm">{new Date(comment.created_at).toLocaleString()}</span>
                                            </div>
                                            <p>{comment.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {profile ? (
                                <form onSubmit={e=>handleSubmit(e, onSubmit)} className="flex gap-2">
                                    <Image
                                        src={profile.avatar_url ?? "/user-none.svg"}
                                        alt={profile.name}
                                        width={4000}
                                        height={4000}
                                        className="h-10 w-10 border-solid border-2 border-onyx-dark rounded-full object-cover"
                                    />
                                    <div className={`${fields.comment.error ? "border-red-500" : isFocus ? "border-onyx-dark" : "border-slate-e"} rounded-sm border-2 border-solid bg-white w-full flex flex-col p-4 gap-2`}>
                                        <textarea 
                                            className="resize-none outline-none h-[10rem]" 
                                            placeholder="Escribe tu comentario"
                                            onFocus={()=>setIsFocus(true)}
                                            onBlur={()=>setIsFocus(false)}
                                            value={fields.comment.value}
                                            onChange={e=>setFieldValue("comment", e.target.value)}
                                        ></textarea>
                                        <ButtonPrimary disabled={loadingComment} isLoading={loadingComment} className="uppercase w-fit self-end justify-end">Post</ButtonPrimary>
                                    </div>
                                    {fields.comment.error && (<span className="text-red-500 text-sm" >{fields.comment.error}</span>)}
                                </form>
                            ): (
                                <div className="flex gap-2 flex-col justify-center items-center">
                                    <div className="bg-onyx-dark rounded-sm px-4 py-1">
                                        <Logo size={0.5}/>
                                    </div>
                                    <p>Crea una cuenta para comentar</p>
                                    <div className="flex w-[40%] gap-4">
                                        <Link href={"/login"}>
                                            <ButtonOutline className="w-full uppercase">
                                                Login
                                            </ButtonOutline>
                                        </Link>
                                        <Link href={"/register"}>
                                            <ButtonPrimary className="w-full uppercase">
                                                Register
                                            </ButtonPrimary>
                                        </Link>
                                    </div>

                                </div>
                            )}
                        </Card>
                        }
                    </motion.div>
                )}
            </AnimatePresence>
            <SharePost idPost={idPost}/>
        </div>
     );
}
 
export default Comments;