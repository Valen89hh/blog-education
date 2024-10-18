import Container from "@/components/containers/container";
import HeaderPost from "./components/header-post";
import PostContent from "./components/post-content";
import SidePost from "./components/side-post";
import Comments from "./components/comments";
import RelatedPosts from "./components/related-posts";
import { unstable_cache } from "next/cache";
import { Post } from "@/lib/supabase/table-type";
import { isNumber } from "@/lib/utils/regex";
import { notFound } from "next/navigation";
import { getPostServer, getPostsServer } from "../actions";
import { updateViewsPost } from "./actions";
import { Metadata, ResolvingMetadata } from "next";
import { extractTextFromHTMLString } from "@/lib/utils/formatter-string";


export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata(
    {params}: {params: {idPost: string}},
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.idPost
    if(!isNumber(id)) notFound()
    

    const post = await getPostServer(parseInt(id))
   
    if(!post) notFound()
   
    return {
      title: post.title,
      description: extractTextFromHTMLString(post.content),
      openGraph: {
        images: [post.post_img],
      },
    }
  }


export async function generateStaticParams() {
    const posts = await getPostsServer()
    return posts.map((post) => ({
      idPost: String(post.id),
    }))
  }

const PostPage = async({params}: {params: {idPost: string}}) => {
    if(!isNumber(params.idPost)) notFound()

    const post = await getPostServer(parseInt(params.idPost))

    if(!post) notFound()

    updateViewsPost(post.id, post.views)


    return ( <>
        <HeaderPost  data={{
            img: post.post_img,
            authorName: post.profiles?.name ?? "",
            categoryName: post.categories?.category_name ?? "",
            title: post.title,
            timeRead: post.time_read,
            shareds: post.shareds,
            views: post.views
        }}/>
        <section className="py-[4rem] bg-[#FAFAFA]">
            <Container className="grid grid-cols-1 lg:grid-cols-8 gap-[4rem] xl:gap-[8rem]">
                <div className="col-span-6">
                    <PostContent htmlContent={post.content}/>
                    <Comments idPost={post.id}/>
                    {post.category_id &&
                        <RelatedPosts idCategory={post.category_id}/>
                    }
                </div>
                <SidePost/>
            </Container>
        </section>
    </> );
}
 
export default PostPage;