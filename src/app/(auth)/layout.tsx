import Container from "@/components/containers/container"
import Logo from "@/components/ui/logo"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
    <header className="px-4 py-2">
      <div className="bg-onyx-dark rounded-sm w-fit px-2 py-1">
        <Logo size={0.5}/>
      </div>
    </header>
    <Container className="grid flex-1 py-4  grid-cols-10 gap-4">
      <div className="flex col-span-10 md:col-span-5 xl:col-span-4 justify-center items-center">
        <div className="p-6 h-fit w-full shadow-sm  bg-white rounded-md border-solid border-2 border-slate-e">
          {children}
        </div>
      </div>
      <div className="col-span-5 xl:col-span-6  hidden md:flex items-center justify-end">
        <Image
          src={"/image-login.svg"}
          alt=""
          width={514}
          height={318}
          className="w-full lg:w-[80%] object-cover"
        />
      </div>
    </Container>
  </div>
}