import Image from "next/image";
import ButtonSecondary from "../buttons/button-secondary";
import Container from "../containers/container";
import Link from "next/link";

const FocusGroup = () => {
    return ( 
        <section className="my-[5rem]">
            <Container >
                <div className="relative">
                    <Image
                        src={"/focus-group.png"}
                        alt=""
                        width={1760}
                        height={600}
                        className="w-full h-screen xs:h-[30rem] object-cover"

                    />
                    <div className="absolute inset-0 gap-2 bg-black bg-opacity-30 flex justify-center items-center text-wrap flex-col text-white">
                        <span className=" text-white px-2 rounded-sm bg-[#ffffff57]">Focus Group</span>

                        <h2 className="w-3/4 text-center text-wrap text-3xl lg:text-5xl px-4">Di&aacute;logo Abierto: Desafíos y Necesidades Educativas</h2>
                        <p className="w-3/4 text-center text-sm xs:text-lg lg:text-xl px-4 overflow-hidden text-ellipsis">En esta secci&oacute;n, se explora los resultados de un focus group en el que se debatio sobre las necesidades urgentes en el sistema educativo.</p>
                        <Link href={"https://drive.google.com/file/d/1sSAT27zzHM3wZIS7GtcqPOHAvvhDaKWQ/view?usp=sharing"} target="_blank">
                            <ButtonSecondary>
                                Ver Focus Group
                            </ButtonSecondary>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
     );
}
 
export default FocusGroup;