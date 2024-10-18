"use client"
import CardPostLatest from "@/components/cards/card-latest-post";
import { Post } from "@/lib/supabase/table-type";
import { useEffect, useState, useTransition } from "react";
import { getLatestPosts } from "../actions";
import CardAnimation from "@/components/animations/card-animation";


const PostLatest = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, startLoading] = useTransition()

    useEffect(()=>{
        startLoading(async()=>{
            const result = await getLatestPosts()
            if(result.success) setPosts(result.data)
        })
    }, [])

    return ( 
        <div className="space-y-4">
            {loading ? 
                Array.from({length: 3}).map((_, i)=><CardAnimation key={"card-lastest-post-"+i} className="h-[5rem] mb-4"/>)
            : posts.length > 0 && (
                <>
                    <h2 className="text-xl">The Latest</h2>
                    {posts.map((post)=>(
                        <CardPostLatest post={post} key={"card-post-latest-"+post.id}/>
                    ))}
                </>
            )
                
            }
        </div>
     );
}
 
export default PostLatest;