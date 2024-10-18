import CardPostInfo from "./components/card-post-info";
import CardNonePosts from "./components/card-none-posts";
import PostsCreateds from "./components/posts-createds";

const DashboardPostsPage = () => {
    return ( 
        <section className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <CardPostInfo typeInfo="shares"/>
                <CardPostInfo typeInfo="comments"/>
                <CardPostInfo typeInfo="views"/>
            </div>
            <PostsCreateds/>
        </section>
     );
}
 
export default DashboardPostsPage;