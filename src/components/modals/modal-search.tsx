"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useModalSearchState } from "@/storage/navbar-storage";
import { useEffect } from "react";
import Modal from "./modal";
import { Search, X, XCircle } from "lucide-react";
import Image from "next/image";

const ModalSearch = () => {
    const {stateModalSearch, closeModalSearch} = useModalSearchState()
    useEffect(()=>{
        console.log(stateModalSearch)
    }, [stateModalSearch])
    return ( 
        <Modal isOpen={stateModalSearch}>
            <div className="h-[30rem] overflow-hidden flex flex-col rounded-sm border-onyx-dark border-2 absolute top-[15%] left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 bg-white">
                <div className="flex border-b-2 border-slate-c items-center p-2 text-ash-gray gap-1">
                    <Search size={22}/>
                        
                    <input className="outline-none text-onyx-dark w-full" placeholder="Buscar" type="text" />
                    <button onClick={closeModalSearch} className="border-solid border-transparent p-[2px] rounded-full transition-all hover:border-ash-gray border-2">
                        <X size={22} />
                    </button>
                </div>
                <div className="flex flex-1 justify-center items-center max-h-full">
                    <Image
                        src={"/not-search.png"}
                        alt="not-search"
                        width={512}
                        height={512}
                        className="h-40 w-40 object-cover"
                    />
                </div>
            </div>
        </Modal>
     );
}
 
export default ModalSearch;