import Container from "@/components/containers/container";
import PostPopular from "../../components/post-popular";
import Posts from "../../components/posts";
import { urlSlugToString } from "@/lib/utils/formatter-string";
import PaginationPosts from "../../components/pagination-posts";
import { isNumber } from "@/lib/utils/regex";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { getPostPagination } from "@/app/posts/actions";

const ITEM_PER_PAGE = 9


const getPosts  = unstable_cache(
    async(page: number, itemPerPage: number, category: string)=>{
        return await getPostPagination(page, itemPerPage, category == "all" ? "" : category)
    },
    ['posts_pagination'],
    {revalidate: 10, tags: ['posts_pagination']}
)

const PostsPage = async({params}: {params: {category: string, page: string}}) => {
    
    if(!isNumber(params.page)) notFound()
    
    const result = await getPosts(parseInt(params.page), ITEM_PER_PAGE, params.category)
    if(!result.success) notFound()
    if(result.data.posts.length == 0) notFound()

    
    return ( 
        <Container className="py-[2rem]">
            <h2 className="text-2xl uppercase text-center mb-[2rem]">{params.category == "all" ? "Posts" : urlSlugToString(params.category)}</h2>
            <PostPopular post={result.data.posts[0]}/>
            {result.data.posts.length > 1 && (
                <Posts posts={result.data.posts.slice(1)}/>
            )}
            <PaginationPosts
                page={parseInt(params.page)}
                category={params.category}
                mountPerPage={ITEM_PER_PAGE}
                mountTotal={result.data.count}
            />
        </Container>
     );
}
export default PostsPage;