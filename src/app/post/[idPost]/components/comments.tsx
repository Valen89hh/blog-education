"use client"

import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Logo from "@/components/ui/logo";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Comments = () => {
    const [openComment, setOpenComment] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [isLogued, setIsLogued] = useState(true)

    return ( 
        <AnimatePresence>
            <div className="mb-">
                <div className="flex gap-4">
                    <ButtonOutline className="w-full flex items-center justify-center gap-2 uppercase">
                        <Share2/>
                        Share
                    </ButtonOutline>
                    <ButtonPrimary onClick={()=>setOpenComment(prev=>!prev)} className="w-full flex items-center justify-center gap-2 uppercase">
                        <MessageSquareText/>
                        Comments (0)
                    </ButtonPrimary>
                </div>
                <motion.div
                    className="mt-8"
                    initial={{height: 0, opacity: 0}}
                    animate={openComment ? {height: "auto", opacity: 1} : {height: 0, opacity: 0}}
                >
                    <Card className="p-6 space-y-8">
                        <ul className="max-h-[40rem] p-2 overflow-y-auto space-y-8">
                            {Array.from({length: 8}).map((_, i)=>(
                                <li key={"comment-"+i} className="flex gap-2">
                                    <Image
                                        src={"/user.jpg"}
                                        alt=""
                                        width={4000}
                                        height={4000}
                                        className="h-7 w-7 rounded-full object-cover"
                                    />

                                    <div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium">Joanna Willeck</h3>
                                            <span className="text-slate-gray text-sm">Jun 12, 2024</span>
                                        </div>
                                        <p>Sociis consequat adipiscing sit curabitur donec sem luctus cras natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper laoreet dapibus </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {isLogued ? (
                            <form action="" className="flex gap-2">
                                <Image
                                    src={"/user.jpg"}
                                    alt=""
                                    width={4000}
                                    height={4000}
                                    className="h-10 w-10 border-solid border-2 border-onyx-dark rounded-full object-cover"
                                />
                                <div className={`${isFocus ? "border-onyx-dark" : "border-slate-e"} rounded-sm border-2 border-solid bg-white w-full flex flex-col p-4 gap-2`}>
                                    <textarea 
                                        className="resize-none outline-none h-[10rem]" 
                                        placeholder="Escribe tu comentario"
                                        onFocus={()=>setIsFocus(true)}
                                        onBlur={()=>setIsFocus(false)}
                                    ></textarea>
                                    <ButtonPrimary className="uppercase w-fit self-end justify-end">Post</ButtonPrimary>
                                </div>
                            </form>
                        ): (
                            <div className="flex gap-2 flex-col justify-center items-center">
                                <div className="bg-onyx-dark rounded-sm px-4 py-1">
                                    <Logo size={0.5}/>
                                </div>
                                <p>Crea una cuenta para comentar</p>
                                <div className="flex w-[40%] gap-4">
                                    <ButtonOutline className="w-full uppercase">
                                        Login
                                    </ButtonOutline>
                                    <ButtonPrimary className="w-full uppercase">
                                        Register
                                    </ButtonPrimary>
                                </div>

                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </AnimatePresence>
     );
}
 
export default Comments;