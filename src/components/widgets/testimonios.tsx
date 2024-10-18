import Container from "../containers/container";
import SliderTestimonio from "../sliders/slider-testimonio";

const testimonials = [
  "Es muy baja con respecto a los demás países, ya que no cambia su modalidad de enseñanza lo que lo deja siendo un país tercermundista.",
  "La educación es fundamental para el desarrollo de las naciones.",
  "Necesitamos una reforma que permita a las nuevas generaciones avanzar."
];

const Testimonios: React.FC = () => {
  return (
    <Container className="my-[5rem]">
      <h3 className="text-center text-2xl font-medium  mb-4">Testimonios Sobre la Educación de Calidad en el Perú</h3>

      <SliderTestimonio items={testimonials} />
    </Container>
  );
};

export default Testimonios;
