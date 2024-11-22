import Image from "next/image";
import ButtonPrimary from "../buttons/button-primary";
import Link from "next/link";

const Hero = () => {
    return ( 
        <section className="relative">
            <Image
                src={"/hero.png"}
                alt=""
                width={2048}
                height={900}
                className="object-cover w-full h-screen"
            />
            <div className="absolute bg-background-modal inset-0 flex gap-3 px-4 flex-col justify-center items-center">
                <h2 className="uppercase text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-center">Una Educación De Calidad
                Para Todos</h2>
                <p className="text-white text-center text-md sm:text-lg md:text-xl">Te Brindamos</p>
                <Link href={"/create-post"}>
                    <ButtonPrimary className="bg-white text-onyx-dark border-white">
                        Deja tu huella educativa
                    </ButtonPrimary>
                </Link>
            </div>
        </section>
     );
}
 
export default Hero;