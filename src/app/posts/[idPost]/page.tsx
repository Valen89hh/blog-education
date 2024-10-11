import Container from "@/components/containers/container";
import HeaderPost from "./components/header-post";
import PostContent from "./components/post-content";
import SidePost from "./components/side-post";
import Comments from "./components/comments";
import RelatedPosts from "./components/related-posts";

const PostPage = ({params}: {params: {idPost: string}}) => {

    const htmlContent = `
    <h2>Hi there,</h2>
    <p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
    <br />
    <p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
    <br />
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nisi earum at, maiores repellat eveniet dolores mollitia obcaecati dicta eligendi modi saepe illo doloribus reiciendis explicabo quo nihil quaerat? Qui quis minima ipsa architecto vel facere, non adipisci veniam, accusamus dolor aspernatur! Alias sunt expedita explicabo ipsum quod molestiae ea, cumque nam praesentium dolore incidunt commodi provident! Animi, quo ex.</p>
    <hr />
    <h1>Lorem, ipsum dolor.</h1>
    <ul>
        <li>That’s a bullet list with one …</li>
        <li>… or two list items.</li>
    </ul>
    <p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p>
    <p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p>
    <blockquote>Wow, that’s amazing. Good work, boy! 👏<br />— Mom</blockquote>
    <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/600x400" />
    `;

    return ( <>
        <HeaderPost/>
        <section className="py-[4rem] bg-[#FAFAFA]">
            <Container className="grid grid-cols-1 lg:grid-cols-8 gap-[4rem] xl:gap-[8rem]">
                <div className="col-span-6">
                    <PostContent htmlContent={htmlContent}/>
                    <Comments/>
                    <RelatedPosts/>
                </div>
                <SidePost/>
            </Container>
        </section>
    </> );
}
 
export default PostPage;