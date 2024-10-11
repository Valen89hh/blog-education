"use client"
import Container from "@/components/containers/container";
import PostPopular from "./components/post-popular";
import Posts from "./components/posts";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


const PostsPage = () => {
    const searchParams = useSearchParams()
    const [category, setCategory] = useState<string | null>(null)

    useEffect(()=>{
        setCategory(searchParams.get("category"))

    }, [searchParams])
    return ( 
        <Container>
            <h2 className="text-2xl uppercase text-center my-[2rem]">{category ?? "Posts"}</h2>
            <PostPopular/>
            <Posts/>
        </Container>
     );
}
 
export default PostsPage;