"use client"
import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Modal from "@/components/modals/modal";
import { useModalShareState } from "@/storage/modal-share-post";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SocialIcon } from 'react-social-icons'
import { updateSharedsPost } from "../actions";

const SharePost = ({idPost}: {idPost: number}) => {
    const {stateModalSharePost, closeModalSharePost} = useModalShareState()
    const [postUrl, setPostUrl] = useState('');

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setPostUrl(window.location.href); // URL completa del post
      }
    }, []);

    const handleCopy = ()=>{
        navigator.clipboard.writeText(postUrl)
            .then(() => {
                toast.success('URL copiada al portapapeles');
            })
            .catch((err) => {
                console.error('Error al copiar la URL: ', err);
            });
        }
        
    const handleUpdateShared = ()=>{
        closeModalSharePost()
        updateSharedsPost(idPost)
    }
  
    // URLs de compartir
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=Mira este increíble post!`;
  


    return ( 
        <Modal isOpen={stateModalSharePost} className="flex justify-center items-center">
            <Card className="w-[80%] space-y-2 sm:w-1/2 max-w-[30rem]">
                <div className="flex justify-between items-center">
                    <h5>Share</h5>
                    <button onClick={closeModalSharePost} className="text-ash-gray border-solid border-transparent p-1 rounded-full transition-all hover:border-ash-gray border-2">
                        <X size={22}/>
                    </button>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <SocialIcon onClick={handleUpdateShared} network="facebook" href={facebookShareUrl} target="_blank" rel="noopener noreferrer"/>
                    <SocialIcon onClick={handleUpdateShared} network="whatsapp" href={whatsappShareUrl} target="_blank" rel="noopener noreferrer"/>
                    <SocialIcon onClick={handleUpdateShared} network="x" href={twitterShareUrl} target="_blank" rel="noopener noreferrer"/>
                </div>
                <div className="flex flex-wrap items-center gap-1 p-2 rounded-ms border-2 border-slate-e">
                    <input 
                        type="text"
                        readOnly 
                        value={postUrl}
                        className="flex-1"
                    />
                    <ButtonPrimary className="text-sm py-1" onClick={handleCopy}>
                        Copiar
                    </ButtonPrimary>
                </div>
            </Card>
        </Modal>
     );
}
 
export default SharePost;