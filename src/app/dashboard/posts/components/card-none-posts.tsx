import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Image from "next/image";
import Link from "next/link";

const CardNonePosts = () => {
    return ( 
        <Card className="flex min-h-[30rem] flex-col justify-center items-center">
            <Image
                src={"/none-posts.svg"}
                alt="none-posts"
                width={269}
                height={269}
                className="w-1/4 object-cover"
            />
            <p className="text-center">Aquí puedes administrar tus publicaciones, pero aún no has escrito nada.</p>
            <Link href={"/create-post"}>
                <ButtonPrimary className="uppercase mt-2 font-sansita">
                    Escribe tu primer post ahora
                </ButtonPrimary>
            </Link>
        </Card>
     );
}
 
export default CardNonePosts;