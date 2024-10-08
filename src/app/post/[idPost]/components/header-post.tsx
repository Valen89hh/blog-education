import Container from "@/components/containers/container";
import { ChartNoAxesColumn, ChevronRight, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

const HeaderPost = () => {
    return ( 
        <section className="relative h-[70vh] text-white">
            <Image
                src={"/post-3.png"}
                alt=""
                width={2048}
                height={800}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-black bg-opacity-30">
                <Container className="flex flex-col overflow-hidden justify-between h-full py-[5rem]">
                    <div className="flex items-center text-sm">
                        <span>Home</span>
                        <ChevronRight size={18}/>
                        <span>Post</span>
                        <ChevronRight size={18}/>
                        {/* This span contains the long breadcrumb text */}
                        <span className="truncate w-full overflow-hidden whitespace-nowrap text-ellipsis">5 Efficient Rules How to Organize Your Working Place</span>
                    </div>
                    <div className="space-y-2">
                        <span className="text-white px-2 py-1 rounded-sm bg-[#ffffff57]">Education</span>

                        <h1 className="text-4xl w-full sm:w-1/2">5 Efficient Rules How to Organize Your Working Place</h1>
                        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] lg:text-sm">
                            <span>by Jonnna Wellick</span>
                            <span className="text-white">    </span>
                            <div className="flex items-center gap-1">
                                <Clock size={18}/>
                                <span>2 minute read</span>
                            </div>
                            <span className="text-white">    </span>
                            <div className="flex items-center gap-1">
                                <ChartNoAxesColumn size={18}/>
                                <span>1.6K views</span>
                            </div>
                            <span className="text-white">    </span>
                            <div className="flex items-center gap-1">
                                <Facebook size={18}/>
                                <Twitter size={18}/>
                                <Instagram size={18}/>
                                <span>1.2K shares</span>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        </section>
     );
}
 
export default HeaderPost;
