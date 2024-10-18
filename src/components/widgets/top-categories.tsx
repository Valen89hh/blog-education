import { createClient } from "@/lib/supabase/server";
import Container from "../containers/container";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient()

const getTopCategories = unstable_cache(
  async()=>{
    const {
      data: categories,
      error: errorCategories
    } = await supabase
      .rpc("get_top_categories")

    if(errorCategories) return []
    return categories ?? []

  },
  ['categories_top'],
  {revalidate: 3600, tags: ['categories_top']}
)

const TopCategories = async() => {
  const categories = await getTopCategories()

  if(categories.length == 0) return null
  console.log(categories)
  return (
    <section className="my-[5rem]">
        <Container>
            <h2 className="text-2xl font-medium">Temas Educativos Relevantes</h2>
            <p >Explora los temas más destacados en educación que marcaron tendencia este año.</p>
            <div className="grid mt-4 grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category) => (
                <Link href={`/posts/category/${category.category_slug}/1`} key={category.category_name} className="relative">
                    <Image
                      src={category.post_img} 
                      alt={category.category_name} 
                      width={1024}
                      height={576}
                      className="w-full h-64 object-cover rounded-md" 
                    />
                    <div className="absolute inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center">
                        <h3 className="text-white text-lg text-center">{category.category_name}</h3>
                    </div>
                </Link>
                ))}
            </div>
        </Container>
    </section>
  );
};

export default TopCategories;
