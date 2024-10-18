"use client"

import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Container from "@/components/containers/container";
import Logo from "@/components/ui/logo";
import RichText from "@/components/widgets/rich-text";
import { X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import SelectImage from "./select-image";
import SelectCategory from "./select-category";
import { useFormFields, Validators } from "@/hooks/use-form-field";
import { PostStatus } from "@/lib/supabase/table-type";
import { createPost } from "./actions";
import { useProfileState } from "@/storage/auth-storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PostShema {
    content: string,
    title: string,
    image: File | null
    idCategory: number | null,
    postStatus: PostStatus
}

const validators: Validators<PostShema> = {
    content: (value, {postStatus})=>{
        if(postStatus == "published" && !value) return "El contenido del post es requerido"
        else return null
    },
    title: (value)=> !value ? "El titulo es requerido" : null,
    image: (value)=> !value ? "La imagen es requerida" : null,
    idCategory: (value)=> !value ? "La categoría es requerida" : null,
    postStatus: (value)=>null
}

const CreatePostPage = () => {
    const router = useRouter()
    const {profile} = useProfileState()
    const [errors, setErrors] = useState<string[]>([])
    const headerRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [hHeader, setHHeader] = useState(0)
    const [hAction, setHAction] = useState(0)
    const [loadingSave, startLoadingSave] = useTransition()
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const {handleValidateSubmit, setFieldValue, fields} = useFormFields<PostShema>({
        content: "",
        image: null,
        idCategory: null,
        title: "",
        postStatus: "draft"
    }, validators)


    const handleSavePost = (status: PostStatus)=>{
        if(profile){
            setFieldValue("postStatus", status)
            handleValidateSubmit((data)=>{
                const formData = new FormData()
                formData.append("image", data.image!)
    
                startLoadingSave(async()=>{
                    const result = await createPost(formData, {
                        idCategory: data.idCategory!,
                        title: data.title,
                        content: data.content,
                        status: status,
                        author_id: profile.id
                    })

                    if(result.success) {
                        toast.success(result.data)
                        router.push("/dashboard/posts")
                    }
                    else setErrors(prev=>[...prev, result.error])
                })
            })
        }
    }

    const handleInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Resetea la altura
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta al contenido
      }
    };
     // Listener de redimensionamiento
     useEffect(() => {
        const handleResize = () => {
            handleInput(); // Llama a handleInput en el resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    useEffect(()=>{
        const errs = Object.keys(fields).filter((key)=>fields[key as keyof PostShema].error !== null).map(key=>fields[key as keyof PostShema].error)
        const errorsValids = errs.filter(er=>er!= null)
        setErrors(errorsValids)
    }, [fields])



    useEffect(() => {
        handleInput()
        if (headerRef.current && actionsRef.current) {
        const { height: heightHeader } = headerRef.current.getBoundingClientRect();
        const { height: heightActions } = actionsRef.current.getBoundingClientRect();
        setHHeader(parseInt(heightHeader.toString()))
        setHAction(parseInt(heightActions.toString()))
        console.log(heightHeader, heightActions)
        }
    }, []);

    return ( 
        <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
            <header ref={headerRef} className="px-4 py-2 flex justify-between">
                <div className="bg-onyx-dark h-fit rounded-sm w-fit px-2 py-1">
                    <Logo size={0.5}/>
                </div>
                <h2 className="font-medium text-lg">Crear Post</h2>
                <button className="text-ash-gray border-solid border-transparent p-1 rounded-full transition-all hover:border-ash-gray border-2">
                    <X size={22}/>
                </button>
            </header>
            <Container className="flex-1 flex flex-col">
                    <Card
                        style={{
                            height: `calc(95vh - ${hHeader}px - ${hAction}px)`,
                        }}
                        className="overflow-y-auto relative py-0 px-0"
                    >
                        {errors.map((error, i)=>(
                            <div className="rounded-ms mb-2 mx-8 bg-red-200 px-4 py-2" key={error+i}>
                                <span className="text-red-500">Opps ocurrio un error</span>
                                <p>{error}</p>
                            </div>
                        ))}

                        <div className="px-8 py-6 space-y-6">
                            <SelectImage onChangeImage={(imgSelect)=>setFieldValue("image", imgSelect.file)}/>
                            <textarea  
                                ref={textareaRef}
                                onInput={handleInput}
                                rows={1}
                                onChange={(e)=>setFieldValue("title", e.target.value)}
                                className="outline-none w-full resize-none uppercase text-4xl lg:text-5xl font-medium  placeholder:text-ash-gray" 
                                placeholder="Titulo del post..." 
                            />
                            <SelectCategory onChangeCategory={cat=>setFieldValue("idCategory", cat?.id ?? null)}/>
                        </div>
                        <RichText onChange={value=>setFieldValue("content", value)}/>
                    </Card>
                    <div ref={actionsRef} className="flex py-4 gap-4">
                        <ButtonPrimary disabled={loadingSave} isLoading={loadingSave} onClick={()=>handleSavePost("published")} className="uppercase font-sansita">
                            Publicar
                        </ButtonPrimary>
                        <ButtonOutline disabled={loadingSave} isLoading={loadingSave} onClick={()=>handleSavePost("draft")} className="uppercase font-sansita">
                            Guardar
                        </ButtonOutline>
                    </div>
            </Container>
        </div>
     );
}
 
export default CreatePostPage;