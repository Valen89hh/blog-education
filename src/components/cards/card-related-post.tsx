import { Clock, Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardRelatedPost = () => {
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
                <h2 className="text-onyx-dark text-2xl my-1 leading-8">Empoderando a los educadores</h2>
                <p className="text-sm text-slate-gray">
                    Educadores de todo el mundo están encontrando métodos innovadores para mejorar
                    el acceso a una educación de calidad, asegurando que ningún estudiante se quede atrás.
                </p>
                <div className="text-sm mt-4 text-slate-gray flex items-center gap-1">
                    <span className="text-sm">June 21, 2022</span>
                    <span className="text-slate-gray">    </span>
                    <Clock size={18}/>
                    <span className="text-slate-gray">2 minute read</span>
                </div>
            </div>
        </article>
     );
}
 
export default CardRelatedPost;