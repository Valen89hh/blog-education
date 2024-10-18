import "@/styles/post-styles.scss"

interface PostContentProps{
    htmlContent: string
}

const PostContent: React.FC<PostContentProps> = ({
    htmlContent
}) => {
    return ( 
        <div className="post" dangerouslySetInnerHTML={{__html: htmlContent}}/>
     );
}
 
export default PostContent;