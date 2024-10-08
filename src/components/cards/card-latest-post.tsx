import { Clock } from "lucide-react";
import Image from "next/image";

const CardPostLatest = () => {
    return ( 
        <article className="relative rounded-sm overflow-hidden">
            <Image
                src={"/post-2.png"}
                alt=""
                width={600}
                height={290}
                className="w-full h-[10rem] object-cover"
            />

            <div className="text-onyx-dark bg-white p-2 space-y-2">
                <h2 className="font-medium">10 Habits That Will Change Your Live for the Better If envy and jealousy are impacting your friendships</h2>
                <div className="flex items-center gap-1 text-sm text-slate-gray">
                    <span>Jun 22, 2024</span>
                    <span className="text-slate-gray">    </span>
                    <Clock size={18}/>
                    <span>2 minute read</span>
                </div>
            </div>
        </article>
     );
}
 
export default CardPostLatest;