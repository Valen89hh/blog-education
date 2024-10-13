import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Learn | Register",
    description: "Registrate en Learn",
  };

export default function RegisterLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }