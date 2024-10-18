/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Card from "@/components/cards/card";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Category } from "@/lib/supabase/table-type";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { getCategories } from "./actions";
import CardAnimation from "@/components/animations/card-animation";


interface SelectCategoryProps{
    onChangeCategory?: (category: Category | null)=>void,
    value?: Category | null
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
    onChangeCategory,
    value
}) => {
    const [categorySelect, setCategorySelect] = useState<Category | null | undefined>(value);
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, startLoading] = useTransition()
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpenCategories(false));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        startLoading(async()=>{
            const result = await getCategories()
            if(result.success) setCategories(result.data)
        })
    }, [])

    const handleSelectCategory = (category: Category) => {
        setCategorySelect(category);
        setIsOpenCategories(false);
        if(onChangeCategory) onChangeCategory(category)
    };

    const handleRemoveCategory = useCallback(() => {
        setCategorySelect(null);
        if(onChangeCategory) onChangeCategory(null)
    }, []);

    useEffect(() => {
        if (categorySelect === null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [categorySelect]);

    return (
        <div ref={ref} className="relative">
            {categorySelect ? (
                <div className="text-ash-gray w-fit rounded-ms bg-slate-e px-2 py-1 flex gap-4 items-center">
                    <span>{categorySelect.category_name}</span>
                    <button onClick={handleRemoveCategory} className="hover:text-red-500">
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <input
                    ref={inputRef}
                    type="text"
                    className="outline-none placeholder:text-ash-gray"
                    placeholder="Seleccionar categoría"
                    onFocus={() => setIsOpenCategories(true)}
                />
            )}
            <Card className={`${isOpenCategories ? "block" : "hidden"} shadow-md mt-1 py-0 max-h-[15rem] overflow-y-auto`}>
                <h3 className="font-medium border-b-2 py-2 border-slate-e">Top Categorías</h3>
                <ul className="py-2">
                    {loading && Array.from({length: 5}).map((_, i)=>(
                        <li key={"card-anim-cat-"+i} className="py-2">
                            <CardAnimation className="w-full h-5"/>
                        </li>
                    ))}
                    {categories.map((category) => (
                        <li
                            onClick={() => handleSelectCategory(category)}
                            className="hover:underline py-1 cursor-pointer"
                            key={"cat-"+category.id}
                        >
                            {category.category_name}
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default SelectCategory;
