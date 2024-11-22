import Image from "next/image";
import Container from "../containers/container";
import Link from "next/link";
import ButtonSecondary from "../buttons/button-secondary";

const EncuestaSection = () => {
    return ( 
        <Container>
            <Image
                src="/hero-encuesta.png"
                alt="hero-encuesta"
                width={1639}
                height={290}

            />
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-xl">Encuesta</h2>
                <p className="text-sm text-slate-gray">Resultados de nuestra encuesta realizada a estudiantes</p>
                <Link href={"https://docs.google.com/forms/d/1_HayHla7Ko7yTwlJ7Ay_iCz7FH72LOTqOc0XBAV0laI/edit?ts=6708a2c4#responses"} target="_blank">
                    <ButtonSecondary className="underline">
                        Ver Resultados
                    </ButtonSecondary>
                </Link>
            </div>
        </Container>
     );
}
 
export default EncuestaSection;