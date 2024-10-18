"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderTestimonioProps {
  items: string[];
}

const SliderTestimonio: React.FC<SliderTestimonioProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: neutral, 1: next, -1: prev

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setDirection(-1);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setDirection(1);
    setCurrentIndex(newIndex);
  };

  // Configuración para las animaciones de entrada y salida
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">

      {/* Contenedor principal que envuelve el motion.div para asegurar su visibilidad */}
      <div className="relative h-32 overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full text-center text-lg italic"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <button onClick={prevSlide} className="text-2xl p-2">
            <ChevronLeft size={56} absoluteStrokeWidth/>
        </button>

        <button onClick={nextSlide} className="text-2xl p-2">
            <ChevronRight size={56} absoluteStrokeWidth/>
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-12 mx-1 rounded-full ${
              currentIndex === index ? "bg-onyx-dark" : "bg-slate-c"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderTestimonio;
