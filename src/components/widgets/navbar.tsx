import Container from "@/components/containers/container";
import Logo from "../ui/logo";
import Link from "next/link";
import ButtonOutline from "../buttons/button-outline";
import ButtonPrimary from "../buttons/button-primary";
import { Menu, Search } from "lucide-react";

const NavBar = () => {
    return ( 
        <header className="absolute z-10 top-0 w-full py-4">
            <Container className="flex justify-between items-center">
                <Logo/>
                
                <nav className="hidden lg:flex gap-8 items-center">
                    <ul className="hidden lg:flex gap-3 uppercase text-white">
                        <li>
                            <Link href={"/"}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href={"/recursos"}>
                                Recursos
                            </Link>
                        </li>
                        <li>
                            <Link href={"/articulos"}>
                                Art&iacute;los
                            </Link>
                        </li>
                        <li>
                            <Link href={"/categorias"}>
                                Categor&iacute;as
                            </Link>
                        </li>
                        <li>
                            <Link href={"/about"}>
                                Sobre Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href={"/contacto"}>
                                Contacto
                            </Link>
                        </li>
                    </ul>

                    <div className="font-sansita flex justify-center items-center uppercase space-x-4">
                        <button>
                            <Search className="text-white"/>
                        </button>
                        <Link href={"sign-up"} >
                            <ButtonPrimary className="uppercase">
                                Suscribirse
                            </ButtonPrimary>
                        </Link>
                    </div>
                </nav>

                <button className="block lg:hidden">
                    <Menu size={30} className="text-white p-[2px] transition-all cursor-pointer border-solid border-transparent hover:border-white rounded-md border-2"/>
                </button>
            </Container>
        </header>
     );
}
 
export default NavBar;