import Container from "@/components/containers/container";
import FocusGroup from "@/components/widgets/focus-group";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return ( 
        <>
            <div className="relative">
                <Image
                    src={"/hero-about.png"}
                    alt="hero-about"
                    width={2048}
                    height={798}
                />
                <Container className="absolute py-[6rem] inset-0 justify-center flex flex-col gap-2 text-white">
                    <h1 className="text-3xl">
                        NOSOTROS
                    </h1>
                    <p className="w-3/4 text-xl">
                        Facilitamos el acceso a una educación de calidad en el Perú a través de cursos y materiales gratuitos,
                        complementados con testimonios de expertos en educación. Promovemos recursos educativos inclusivos y
                        equitativos para todos.
                    </p>
                </Container>
            </div>
            <Container className="flex my-[2rem]">
                <div className="grid grid-cols-5 gap-8 w-fit mx-auto">
                    <article className="flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={"/xiomora.png"}
                                alt="xiomara"
                                width={300}
                                height={300}
                                className="h-[10rem] rounded-full w-[10rem] object-cover"
                            />
                        </div>
                        <p>Xiomara</p>
                    </article>
                    <article className="flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={"/rodrigo.png"}
                                alt="xiomara"
                                width={300}
                                height={300}
                                className="h-[10rem] rounded-full w-[10rem] object-cover"
                            />
                        </div>
                        <p>Rodrigo</p>
                    </article>
                    <article className="flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={"/kely.png"}
                                alt="xiomara"
                                width={300}
                                height={300}
                                className="h-[10rem] rounded-full w-[10rem] object-cover"
                            />
                        </div>
                        <p>Kely</p>
                    </article>
                    <article className="flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={"/sebas.png"}
                                alt="xiomara"
                                width={300}
                                height={300}
                                className="h-[10rem] rounded-full w-[10rem] object-cover"
                            />
                        </div>
                        <p>Sebastian</p>
                    </article>
                    <article className="flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={"/kity.png"}
                                alt="xiomara"
                                width={300}
                                height={300}
                                className="h-[10rem] rounded-full w-[10rem] object-cover"
                            />
                        </div>
                        <p>Kitzia</p>
                    </article>
                </div>
            </Container>
            <FocusGroup/>
            <Container className="space-y-6">
                <h2 className="uppercase text-2xl">Nuestras Entrevistas</h2>
                <div className="grid grid-cols-3 gap-8">
                    <article className="space-y-6">
                        <Image
                            src={"/encuesta1.jpeg"}
                            alt="xiomara"
                            width={960}
                            height={400}
                            className="h-[15rem] object-cover"
                        />
                        <Link className="underline" href={"https://drive.google.com/file/d/1bqvoEi2jzCxOHQvMWU-q1acVIlFcX1ZM/preview"} target="_blank">Ver Encuesta</Link>
                    </article>
                    <article className="space-y-6">
                        <Image
                            src={"/encuesta2.jpg"}
                            alt="xiomara"
                            width={960}
                            height={400}
                            className="h-[15rem] object-cover"
                        />
                        <Link className="underline" href={"https://drive.google.com/file/d/1bsYxGAX98ngzLS5bknY88w9VNzNwGrbP/preview"} target="_blank">Ver Encuesta</Link>
                    </article>
                    <article className="space-y-6">
                        <Image
                            src={"/encuesta3.jpg"}
                            alt="xiomara"
                            width={960}
                            height={400}
                            className="h-[15rem] object-cover"
                        />
                        <Link className="underline" href={"https://drive.google.com/file/d/1bz07eazDVXJpu_vFRfSf7c0oKG0nmKQz/preview"} target="_blank">Ver Encuesta</Link>
                    </article>
                </div>
                <article className="space-y-6">
                    <Image
                        src={"/elevator.jpeg"}
                        alt="xiomara"
                        width={960}
                        height={400}
                        className="h-[30rem] w-full object-cover"
                    />
                    <Link className="underline" href={"https://drive.google.com/file/d/1bz07eazDVXJpu_vFRfSf7c0oKG0nmKQz/preview"} target="_blank">Ver Elevator Pitch</Link>
                </article>
            </Container>
        </>
     );
}
 
export default AboutPage;