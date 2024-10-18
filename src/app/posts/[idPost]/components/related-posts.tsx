import CardRelatedPost from "@/components/cards/card-related-post";
import { unstable_cache } from "next/cache";
import { getPostRelated } from "../actions";

const getPostRelationeds = unstable_cache(
    async(idCategory: number)=>{
        return await getPostRelated(idCategory)
    },
    ["post_related"],
    {revalidate: 3600, tags: ['post_related']}
)

const RelatedPosts = async({idCategory}: {idCategory: number}) => {
    const result = await getPostRelationeds(idCategory)

    if(!result.success) return null
    if(result.data.length == 0) return null

    return ( 
        <section className="space-y-4 mt-8">
            <h3 className="uppercase text-2xl">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {result.data.map((post)=>(
                    <CardRelatedPost post={post} key={"related-post-"+post.id}/>
               ))} 
            </div>
        </section>
     );
}

export default RelatedPosts;