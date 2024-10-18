import Container from "@/components/containers/container"
import SideBarDashboard, { TitleDashboard } from "@/components/sidebars/sidebar-dashboard"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Dashboard",
  description: "Dashboard para administrar los posts creados por los usuario y mejorar la educación",
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-[#F8F8F8] flex-grow">
        <Container className="flex flex-col lg:flex-row gap-8 py-6">
            <SideBarDashboard className="hidden lg:block"/>
            <TitleDashboard className="block lg:hidden"/>
            <div className="flex-1">
                {children}
            </div>
    </Container>
  </div>
}