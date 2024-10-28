import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { islogged } from "@/actions"
 
export default async function Layout({ children }: { children: React.ReactNode }) {
    await islogged()
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}