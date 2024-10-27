import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getsession } from "@/actions"
 
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getsession();
    console.log(session);
  return (
    
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}