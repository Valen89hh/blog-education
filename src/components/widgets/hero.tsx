import Image from "next/image";
import ButtonPrimary from "../buttons/button-primary";

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
                <h2 className="uppercase text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-center">Inspiración para una educación de 
                calidad para todos</h2>
                <p className="text-white text-center text-md sm:text-lg md:text-xl">Aprende inteligentemente, enseña con impacto</p>
                <ButtonPrimary className="bg-white text-onyx-dark border-white">
                    Comienza a mejorar la educación
                </ButtonPrimary>
            </div>
        </section>
     );
}
 
export default Hero;