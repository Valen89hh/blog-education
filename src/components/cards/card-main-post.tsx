import { Post, PostForShow } from "@/lib/supabase/table-type";
import { stringToUrlSlug } from "@/lib/utils/formatter-string";
import { Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardMainPost = ({post}: {post: PostForShow}) => {
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
                <h2 className="text-onyx-dark text-3xl my-3 leading-8">{post.title}</h2>
                <div className="flex my-2 items-center justify-between text-sm">
                    <div className="flex justify-between items-center gap-1">
                        <Image
                            src={post.authorImage ?? "/user-none.svg"}
                            alt={post.authorName}
                            width={4000}
                            height={4000}
                            className="w-7 h-7 rounded-full object-cover"
                        />
                        <div className="flex lg:hidden flex-col">
                            <h4 className="w-fit text-nowrap text-[1rem]">{post.authorName}</h4>
                            <div className="flex items-center gap-1 text-slate-gray">
                                <span className="text-slate-gray text-sm">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</span>
                                <span className="text-slate-gray">    </span>
                                <Share2 size={16}/>
                                <span className="text-sm ">{post.shareds} shares</span>
                            </div>
                        </div>
                        <h4 className="w-fit text-nowrap hidden lg:block text-[1rem]">{post.authorName}</h4>
                        <span className="text-slate-gray hidden lg:block">    </span>
                        <span className="text-slate-gray text-sm hidden lg:block">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</span>
                    </div>
                    <div className="text-slate-gray hidden lg:flex items-center gap-1">
                        <Share2 size={16}/>
                        <span className="text-sm">{post.shareds} shareds</span>
                    </div>
                </div>
                <p className="text-sm text-slate-gray">
                    {post.content}
                </p>
                <Link href={`/posts/${post.id}`} className="text-onyx-dark w-fit mt-1 underline">
                    View Post
                </Link>
            </div>
        </article>
     );
}
 
export default CardMainPost;