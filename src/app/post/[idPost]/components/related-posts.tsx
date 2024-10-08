import CardRelatedPost from "@/components/cards/card-related-post";

const RelatedPosts = () => {
    return ( 
        <section className="space-y-4 mt-8">
            <h3 className="uppercase text-2xl">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {Array.from({length: 6}).map((_, i)=>(
                    <CardRelatedPost key={"related-post-"+i}/>
               ))} 
            </div>
        </section>
     );
}

export default RelatedPosts;