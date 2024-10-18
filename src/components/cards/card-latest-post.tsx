import { Post } from "@/lib/supabase/table-type";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardPostLatest = ({post}: {post: Post}) => {
    return ( 
        <Link href={"/posts/"+post.id}>
            <article className="relative rounded-sm overflow-hidden">
                <Image
                    src={post.post_img}
                    alt={post.title}
                    width={600}
                    height={290}
                    className="w-full h-[10rem] object-cover"
                />

                <div className="text-onyx-dark  bg-white p-2 space-y-2">
                    <h2 className="font-medium">{post.title}</h2>
                    <div className="flex justify-between items-center flex-wrap gap-1 text-sm text-slate-gray">
                        <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</span>
                        <span className="text-slate-gray">    </span>
                        <div className="flex items-center gap-1">
                            <Clock size={18}/>
                            <span>{post.time_read} minute read</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
     );
}
 
export default CardPostLatest;