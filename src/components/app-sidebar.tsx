"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { logout } from "@/actions";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const itemsAlmacen = [
  {
    title: "Dietas",
    url: "/users",
    icon: Home,
  },
  {
    title: "Medicamento",
    url: "/users/profile",
    icon: Inbox,
  },
  {
    title: "Ganado",
    url: "/users/admin",
    icon: Calendar,
  },
  {
    title: "Almacén",
    url: "#",
    icon: Search,
  },
  {
    title: "Pedidos",
    url: "#",
    icon: Settings,
  },
  {
    title: "Estadísticas",
    url: "#",
    icon: Settings,
  },
];

const itemsAdmin = [
  {
    title: "Ganado",
    url: "/users/admin/ganado",
    icon: Home,
  },
  {
    title: "Empleados",
    url: "/users/admin/empleados",
    icon: Inbox,
  },
  {
    title: "Ventas",
    url: "/users/admin/ventas",
    icon: Calendar,
  },
  {
    title: "Almacén",
    url: "/users/admin/almacen",
    icon: Search,
  },
  {
    title: "Estadísticas",
    url: "/users/admin/estadisticas",
    icon: Settings,
  },
];

export function AppSidebar() {

  const pathname = usePathname();

  const [logoutaction, setLogout] = useState(false);

  const handleLogout = async () => {
    setLogout(true);
    await logout();
    setLogout(false);
  };

  const itemsChoice = pathname.toString().substring(0,14) == "/users/almacen" ? itemsAlmacen : itemsAdmin;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel >Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
              {itemsChoice.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className={`${pathname == item.url ? 'stroke-acento' : ''}`}/>
                      <span className={`${pathname == item.url ? 'text-acento' : ''}`} >{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:overflow-x-hidden">
        <SidebarMenuItem key={"logout"}>
          <SidebarMenuButton onClick={handleLogout} disabled={logoutaction}>
          <img src="/assets/almacen/logout.svg" alt="" width={20}/>
            <span>{"Salir"}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
