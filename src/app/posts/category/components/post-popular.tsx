import { PostForShow } from "@/lib/supabase/table-type";
import { ChartNoAxesColumn, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PostPopular = ({post}: {post: PostForShow}) => {
    return ( 
        <Link href={"/posts/"+post.id}>
            <article className="relative my-[2rem] overflow-hidden rounded-sm">
                <Image
                    src={post.post_img}
                    alt={post.title}
                    width={2048}
                    height={900}
                    className="object-cover w-full h-[30rem]"
                />

                <div className="absolute cursor-pointer inset-0 p-4 gap-2 hover:bg-opacity-40 bg-black bg-opacity-30 text-white flex flex-col justify-end">
                    <span className="text-white px-2 py-1 rounded-sm w-fit bg-[#ffffff57]">{post.categoryName}</span>

                    <h1 className="text-4xl w-full sm:w-1/2">{post.title}</h1>
                    <p className=" text-lg w-full sm:w-1/2">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] lg:text-sm">
                        <Image
                            src={post.authorImage ?? "/user-none.svg"}
                            alt={post.authorName}
                            width={4000}
                            height={4000}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{post.authorName}</span>
                        <span className="text-white">    </span>
                        <div className="flex items-center gap-1">
                            <Clock size={18}/>
                            <span>{post.time_read} minute read</span>
                        </div>
                        <span className="text-white">    </span>
                        <div className="flex items-center gap-1">
                            <ChartNoAxesColumn size={18}/>
                            <span>{post.views} views</span>
                        </div>
                        <span className="text-white">    </span>
                        <div className="flex items-center gap-1">
                            <Facebook size={18}/>
                            <Twitter size={18}/>
                            <Instagram size={18}/>
                            <span>{post.shareds} shareds</span>
                        </div>

                    </div>
                </div>
            </article>
        </Link>
     );
}
 
export default PostPopular;