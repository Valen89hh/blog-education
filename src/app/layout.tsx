import type { Metadata } from "next";
import { Montserrat, Sansita } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/footer";

const montserrat = Montserrat({subsets: ["latin"]})
const sansita = Sansita({subsets: ["latin"], variable: "--font-sansita", weight: ["400", "700", "800", "900"]})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansita.variable}`}>
      <body
        className={`${montserrat.className} antialiased`}
      >
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
