import Container from "@/components/containers/container"
import SideBarDashboard from "@/components/sidebars/sidebar-dashboard"
import Logo from "@/components/ui/logo"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-[#F8F8F8]">
        <Container className="flex gap-8 py-6">
            <SideBarDashboard/>
            <div className="flex-1">
                {children}
            </div>
    </Container>
  </div>
}