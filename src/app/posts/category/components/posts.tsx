import ButtonOutline from "@/components/buttons/button-outline";
import CardMainPost from "@/components/cards/card-main-post";
import { unstable_cache } from "next/cache";
import { getPostPagination } from "../../actions";
import { extractTextFromHTMLString } from "@/lib/utils/formatter-string";
import { PostForShow } from "@/lib/supabase/table-type";


const Posts = ({posts}: {posts: PostForShow[]}) => {

    return ( 
        <section className="space-y-2 my-[4rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {posts.map((post)=>(
                    <CardMainPost post={post} key={"post-"+post.id}/>
                ))}
            </div>
        </section>
     );
}
 
export default Posts;