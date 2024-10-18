import Card from "@/components/cards/card";
import { useOutsideClick } from "@/hooks/use-outside-click";
import useQuery from "@/hooks/use-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const filters = [
    {
        key: "all",
        value: "All Posts"
    },
    {
        key: "views",
        value: "Most Views"
    },
    {
        key: "comments",
        value: "Most Comments"
    },
    {
        key: "shareds",
        value: "Most Shareds"
    },
    {
        key: "draft",
        value: "Most Drafts"
    },
    {
        key: "published",
        value: "Most Published"
    },
]

const FilterPosts = () => {
    const [isOpen, setIsOpen] = useState(false) 
    const [filterSelect, setFilterSelect] = useState(filters[0].value)
    const {setQuery} = useQuery()
    const ref = useOutsideClick<HTMLDivElement>(()=>setIsOpen(false))

    const handleSelectFilter = (key: string, value: string)=>{
        setQuery("filter", key)
        setFilterSelect(value)
        setIsOpen(false)
    }

    return ( 
        <div ref={ref} className="relative">
            <Card className="p-0">
                <button onClick={()=>setIsOpen(prev=>!prev)} className="flex items-center gap-2 px-2 py-1">
                    <span>{filterSelect}</span>
                    <ChevronDown className="text-ash-gray" size={20}/>
                </button>
            </Card>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.15}}
                        className="absolute  left-full -translate-x-full mt-1 w-max bg-white rounded-ms border-2 border-slate-e shadow-md"
                    >
                        {filters.map((fl)=>(
                            <li onClick={()=>handleSelectFilter(fl.key, fl.value)} className="py-1 cursor-pointer px-4 hover:bg-slate-e" key={"filter-"+fl.key}>
                                {fl.value}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
     );
}
 
export default FilterPosts;