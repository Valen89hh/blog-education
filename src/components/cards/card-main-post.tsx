import { Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardMainPost = () => {
    return ( 
        <article className="rounded-sm overflow-hidden pb-6">
            <div className="relative">
                <Image
                    src={"/post-1.png"}
                    alt=""
                    width={560}
                    height={420}
                    className="h-50 w-full object-cover"
                />
                <span className="absolute top-2 left-2 text-white px-2 rounded-sm bg-[#ffffff57]">Education</span>
            </div>
            <div className="flex flex-col mt-2">
                <h2 className="text-onyx-dark text-3xl my-3 leading-8">Empoderando a los educadores</h2>
                <div className="flex my-2 items-center justify-between text-sm">
                    <div className="flex justify-between items-center gap-1">
                        <Image
                            src={"/user.jpg"}
                            alt=""
                            width={4000}
                            height={4000}
                            className="w-7 h-7 rounded-full object-cover"
                        />
                        <h4 className="w-fit text-nowrap text-[1rem]">Joanna Wellick</h4>
                        <span className="text-slate-gray">    </span>
                        <span className="text-slate-gray text-sm">June 18, 2024</span>
                    </div>
                    <div className="text-slate-gray flex items-center gap-1">
                        <Share2 size={16}/>
                        <span className="text-sm">1k shares</span>
                    </div>
                </div>
                <p className="text-sm text-slate-gray">
                    Educadores de todo el mundo están encontrando métodos innovadores para mejorar
                    el acceso a una educación de calidad, asegurando que ningún estudiante se quede atrás.
                </p>
                <Link href={""} className="text-onyx-dark w-fit mt-1 underline">
                    View Post
                </Link>
            </div>
        </article>
     );
}
 
export default CardMainPost;