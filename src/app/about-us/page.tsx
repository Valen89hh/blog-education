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
                <div className="flex flex-wrap gap-6 h-fit">
                    <div>
                        <Image
                            src={"/xiomora.png"}
                            alt="xiomara"
                            width={300}
                            height={300}
                            className="h-[10rem] w-[10rem] object-cover"
                        />
                        <p className="uppercase text-center">XIOMARA</p>
                    </div>
                    <div>
                        <Image
                            src={"/rodrigo.png"}
                            alt="rodrigo"
                            width={300}
                            height={300}
                            className="h-[10rem] w-[10rem] object-cover"
                        />
                        <p className="uppercase text-center">RODRIGO</p>
                    </div>
                    <div>
                        <Image
                            src={"/kely.png"}
                            alt="kely"
                            width={300}
                            height={300}
                            className="h-[10rem] w-[10rem] object-cover"
                        />
                        <p className="uppercase text-center">KEYLI</p>
                    </div>
                    <div>
                        <Image
                            src={"/sebas.png"}
                            alt="sebas"
                            width={300}
                            height={300}
                            className="h-[10rem] w-[10rem] object-cover"
                        />
                        <p className="uppercase text-center">SEBASTIAN</p>
                    </div>
                    <div>
                        <Image
                            src={"/kity.png"}
                            alt="kity"
                            width={300}
                            height={300}
                            className="h-[10rem] w-[10rem] object-cover"
                        />
                        <p className="uppercase text-center">KYTZIA</p>
                    </div>
                </div>
                <Link href={"https://drive.google.com/file/d/1cBcAki1sqv9y_5R1Gvb0SNVa3f18oy13/view?usp=drivesdk"} target="_blank">
                    <Image
                        src={"/tiktok.png"}
                        alt="tiktok"
                        width={716}
                        height={1113}
                        className="h-[40rem] object-cover"
                    />
                </Link>
            </Container>
            <FocusGroup/>
            <Container className="space-y-6">
                <h2 className="uppercase text-2xl">Nuestras Entrevistas</h2>
                <div className="flex justify-center flex-wrap gap-4">
                    <iframe src="https://drive.google.com/file/d/1bqvoEi2jzCxOHQvMWU-q1acVIlFcX1ZM/preview" width="350" height="480" allow="autoplay"></iframe>
                    <iframe src="https://drive.google.com/file/d/1bsYxGAX98ngzLS5bknY88w9VNzNwGrbP/preview" width="350" height="480" allow="autoplay"></iframe>
                    <iframe src="https://drive.google.com/file/d/1bz07eazDVXJpu_vFRfSf7c0oKG0nmKQz/preview" width="350" height="480" allow="autoplay"></iframe>
                </div>
                <iframe src="https://drive.google.com/file/d/16um1eWtC358FMRRHTArahfwTjIKEL1rg/preview" className="w-full" height={480} allow="autoplay"></iframe>
            </Container>
        </>
     );
}
 
export default AboutPage;