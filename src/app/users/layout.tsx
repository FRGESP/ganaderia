import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { islogged } from "@/actions"
import AppNavbar from "@/components/ui/appNavbar"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await islogged()
  return (
    <SidebarProvider defaultOpen={false} className="relative flex">
      <AppSidebar />
      <div className="flex-1">
        <AppNavbar />
        <main className="mt-10">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}