import Image from "next/image";
import Container from "../containers/container";
import ButtonSecondary from "../buttons/button-secondary";

const CallAction = () => {
    return ( 
        <section className="my-[5rem]">
            <Container className="relative">
                <Image
                    src={"/hero-2.png"}
                    alt=""
                    width={1760}
                    height={600}
                    className="w-full h-screen xs:h-[30rem] object-cover"

                />
                <div className="absolute inset-0 gap-2 flex justify-center items-center text-wrap flex-col text-white">
                    <span className=" text-white px-2 rounded-sm bg-[#ffffff57]">Education</span>

                    <h2 className="w-3/4 text-center text-wrap text-3xl lg:text-5xl px-4">Herramientas de aprendizaje innovadoras para un futuro educativo más brillante</h2>
                    <p className="w-3/4 text-center text-sm xs:text-lg lg:text-xl px-4">Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                    <ButtonSecondary>
                        Empezar a Aprender
                    </ButtonSecondary>
                </div>
            </Container>
        </section>
     );
}
 
export default CallAction;