/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Definir el tipo de los props con ref
interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {}

// Usar forwardRef para permitir que el componente reciba ref
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref} // Pasar ref al div
        className={twMerge("border-solid rounded-ms border-2 border-slate-e bg-white p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Opcional: Dar un nombre al componente para depuración
Card.displayName = "Card";

export default Card;
