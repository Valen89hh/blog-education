import Container from "../containers/container";

const TopCategories = () => {
  const highlights = [
    {
      title: 'Métodos de enseñanza innovadores',
      img: '/education-1.png',
    },
    {
      title: 'Recursos educativos',
      img: '/education-2.png',
    },
    {
      title: 'Herramientas tecnológicas para la educación',
      img: '/education-1.png',
    },
    {
      title: 'Estrategias para el aprendizaje autónomo',
      img: '/education-2.png',
    },
    {
      title: 'Tendencias en educación 2024',
      img: '/education-1.png',
    },
  ];

  return (
    <section className="my-[5rem]">
        <Container>
            <h2 className="text-xl">Temas Educativos Relevantes</h2>
            <p className="text-sm">Explora los temas más destacados en educación que marcaron tendencia este año.</p>
            <div className="grid mt-4 grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-6">
                {highlights.map((item, index) => (
                <div key={index} className="relative">
                    <img src={item.img} alt={item.title} className="w-full h-64 object-cover rounded-md" />
                    <div className="absolute inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center">
                        <h3 className="text-white text-lg text-center">{item.title}</h3>
                    </div>
                </div>
                ))}
            </div>
        </Container>
    </section>
  );
};

export default TopCategories;
