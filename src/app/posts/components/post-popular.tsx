import { ChartNoAxesColumn, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

const PostPopular = () => {
    return ( 
        <article className="relative my-[2rem] overflow-hidden rounded-sm">
            <Image
                src={"/hero.png"}
                alt=""
                width={2048}
                height={900}
                className="object-cover w-full h-[30rem]"
            />

            <div className="absolute inset-0 p-4 gap-2 bg-black bg-opacity-20 text-white flex flex-col justify-end">
                <span className="text-white px-2 py-1 rounded-sm w-fit bg-[#ffffff57]">Education</span>

                <h1 className="text-4xl w-full sm:w-1/2">5 Efficient Rules How to Organize Your Working Place</h1>
                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] lg:text-sm">
                    <Image
                        src={"/user.jpg"}
                        alt=""
                        width={4000}
                        height={4000}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>Jonnna Wellick</span>
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
        </article>
     );
}
 
export default PostPopular;