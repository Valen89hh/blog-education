import { Post, PostRelated } from "@/lib/supabase/table-type";
import { Clock, Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardRelatedPost = ({post}: {post: PostRelated}) => {
    return ( 
        <article className="rounded-sm overflow-hidden pb-6">
            <div className="relative">
                <Image
                    src={post.post_img}
                    alt={post.title}
                    width={560}
                    height={420}
                    className="h-40 w-full object-cover"
                />
                <span className="absolute top-2 left-2 text-white px-2 rounded-sm bg-[#ffffff57]">{post.categoryName}</span>
            </div>
            <div className="flex flex-col mt-2">
                <h2 className="text-onyx-dark text-2xl my-1 leading-8">{post.title}</h2>
                <p className="text-sm text-slate-gray">
                    {post.content}
                </p>
                <div className="text-sm mt-4 text-slate-gray flex items-center gap-1">
                    <span className="text-sm">{post.published_at ? new Date(post.published_at).toDateString() : ""}</span>
                    <span className="text-slate-gray">    </span>
                    <Clock size={18}/>
                    <span className="text-slate-gray">{post.time_read} minute read</span>
                </div>
                <Link href={"/posts/"+post.id} className="mt-2 underline">
                    View Post
                </Link>
            </div>
        </article>
     );
}
 
export default CardRelatedPost;