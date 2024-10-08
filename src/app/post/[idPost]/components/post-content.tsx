import "@/styles/post-styles.css"

interface PostContentProps{
    htmlContent: String
}

const PostContent: React.FC<PostContentProps> = ({
    htmlContent
}) => {
    return ( 
        <div className="post" dangerouslySetInnerHTML={{__html: htmlContent}}/>
     );
}
 
export default PostContent;