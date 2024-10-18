import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/footer";
import { createClient } from "@/lib/supabase/server";
import { Toaster } from "react-hot-toast";


const montserrat = localFont({
  src: './font/montserrat.ttf',
  display: 'swap',
})
const sansita = localFont({
  src: './font/sansita-regular.ttf',
  display: 'swap',
  variable: '--font-sansita'
})


export const metadata: Metadata = {
  title: "Learn",
  description: "Blog sobre la educación de calidad, oferciendo recursos para mejorar el aprendizaje",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()

  return (
    <html lang="en" className={`${montserrat.className} ${sansita.variable}`}>
      <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body
        className="min-h-screen flex flex-col"
      >
        <NavBar user={user}/>
        {children}
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}
