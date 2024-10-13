import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Learn | Login",
    description: "Iniciar session en Learn",
  };

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }