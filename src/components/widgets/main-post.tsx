import { Facebook, Instagram, Twitter } from "lucide-react";
import Container from "../containers/container";
import CardMainPost from "../cards/card-main-post";
import ButtonOutline from "../buttons/button-outline";

const MainPost = () => {
    return ( 
        <section className="my-[5rem]">
            <Container>
                <ul className="flex mb-4 justify-end items-center text-sm gap-3">
                    <li className="flex justify-center  items-center text-onyx-dark">
                        <Facebook size={20}/>
                        <span>2.3M</span>
                    </li>
                    <li className="flex justify-center items-center gap-1 text-onyx-dark">
                        <Instagram size={20}/>
                        <span>23</span>
                    </li>
                    <li className="flex justify-center items-center gap-1 text-onyx-dark">
                        <Twitter size={20}/>
                        <span>23</span>
                    </li>
                </ul>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({length: 9}).map((_, i)=>(
                        <CardMainPost key={"main-post-"+i}/>
                    ))}
                </div>
                <div className="flex mt-4 justify-center items-center">
                    <ButtonOutline className="w-1/4 border-[1px] font-light min-w-fit border-slate-gray text-slate-gray">
                        Load More
                    </ButtonOutline>
                </div>
            </Container>
        </section>
    );
}
 
export default MainPost;