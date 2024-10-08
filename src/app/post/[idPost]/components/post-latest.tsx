import CardPostLatest from "@/components/cards/card-latest-post";

const PostLatest = () => {
    return ( 
        <div className="space-y-4">
            <h2 className="text-xl">The Latest</h2>
            {Array.from({length: 3}).map((_, i)=>(
                <CardPostLatest key={"card-post-latest-"+i}/>
            ))}
        </div>
     );
}
 
export default PostLatest;