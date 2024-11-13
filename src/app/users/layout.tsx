import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { islogged } from "@/actions"
import AppNavbar from "@/components/ui/appNavbar"
import { Toaster } from "@/components/ui/toaster"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await islogged()
  return (
    <SidebarProvider defaultOpen={false} className="relative flex">
      <AppSidebar />
      <div className="flex-1">
        <div className="sticky top-0 shadow-md z-50">
          <AppNavbar />
        </div>
        <main className="">
          {children}
          <Toaster />
        </main>
        {/* <footer className="w-full bg-gray-800 text-white py-4 text-center">
      © 2024 BlackWaves. Todos los derechos reservados.
    </footer> */}
      </div>
    </SidebarProvider>
  )
}