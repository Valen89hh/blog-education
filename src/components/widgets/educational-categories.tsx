"use client"

import Image from "next/image";
import Card from "../cards/card";
import Container from "../containers/container";
import Link from "next/link";
import { useState } from "react";

const categories = [
    {
        id: 1,
        category_name: "Education",
    },
    {
        id: 2,
        category_name: "Tecnologia",
    },
    {
        id: 3,
        category_name: "Recursos",
    },
    {
        id: 4,
        category_name: "Politica",
    }
]

const EducationalCategories = () => {
    const [idCategory, setIdCategory] = useState(1)

    return ( 
        <section className="my-[5rem]">
            <Container className="space-y-4">
                <ul className="flex items-center">
                    {categories.map((cat)=>(
                        <li onClick={()=>setIdCategory(cat.id)} className={`cursor-pointer pr-4 border-solid border-b-2 ${idCategory == cat.id ? "border-onyx-dark" : "border-slate-c"}`} key={cat.id}>
                            {cat.category_name}
                        </li>
                    ))}
                </ul>
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 h-full">
                    <Card className="col-span-1 lg:col-span-5 h-full flex gap-4">
                        <article className="w-full md:w-[60%] space-y-2 text-onyx-dark">
                            <Image
                                src={"/post-2.png"}
                                alt=""
                                width={600}
                                height={290}
                                className="w-full h-60 object-cover"
                            />
                            <span className="text-[0.7rem] text-slate-gray">1 Month Ago</span>
                            <h2 className="text-xl text-onyx-dark font-medium">Si aleqefqewfqwefqwefqwr eqwerqwerqwerqwer derecho a la educacion</h2>
                            <p className="text-sm text-onyx-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus autem similique corporis eligendi asperiores nulla!</p>
                            <Link href={""} className="text-onyx-dark underline">View Post</Link>
                        </article>
                        <div className="w-[40%] hidden md:grid grid-col-1 gap-4 grid-rows-4">
                            {Array.from({length: 4}).map((_, i)=>(
                                <article key={"article-"+i} className="flex gap-2">
                                    <Image
                                        src={"/post-2.png"}
                                        alt=""
                                        width={600}
                                        height={290}
                                        className="w-[50%] h-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-sm font-medium">Recuros educativos</h2>
                                        <span className="text-[0.7rem]">21 March 2021</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Card>
                    <Card className="col-span-1 lg:col-span-3 h-fit flex flex-col gap-2">
                        <h3 className="h-full font-medium">Relacionado</h3>
                        <div className="grid gap-4 grid-cols-1 h-[28rem] grid-rows-3 w-full">
                            {Array.from({length: 3}).map((_, i)=>(
                                <article key={"art-"+i} className="flex gap-4">
                                    <Image
                                        src={"/post-1.png"}
                                        alt=""
                                        width={600}
                                        height={290}
                                        className="w-1/2 h-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-onyx-dark font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                                        <span className="text-[0.7rem] text-slate-gray">21 March 2021</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Card>
                </div>
            </Container>
        </section>
     );
}
 
export default EducationalCategories;