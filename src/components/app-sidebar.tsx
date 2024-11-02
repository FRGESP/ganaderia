"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { logout } from "@/actions";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  SidebarHeader
} from "@/components/ui/sidebar";

// Menu items.
const itemsAlmacen = [
  {
    title: "Dietas",
    url: "/users/almacen/dietas",
    icon: "/assets/Almacen/Maiz.png",
    iconBold: "/assets/Almacen/MaizVerde.png",
  },
  {
    title: "Medicamento",
    url: "/users/almacen/medicamento",
    icon: "/assets/Almacen/Medicamentos.png",
    iconBold: "/assets/Almacen/MedicamentosVerde.png",
  },
  {
    title: "Ganado",
    url: "/users/almacen/ganado",
    icon: "/assets/Admin/Ganado.png",
    iconBold: "/assets/Admin/GanadoVerde.png",
  },
  {
    title: "Almacén",
    url: "/users/almacen/almacenpage",
    icon: "/assets/Almacen/Almacen.png",
    iconBold: "/assets/Almacen/AlmacenVerde.png",

  },
  {
    title: "Pedidos",
    url: "/users/almacen/pedidos",
    icon: "/assets/Almacen/Pedidos.png",
    iconBold: "/assets/Almacen/PedidosVerde.png",
  },
  {
    title: "Estadísticas",
    url: "/users/almacen/estadisticas",
    icon: "/assets/Almacen/Estadisticas.png",
    iconBold: "/assets/Almacen/EstadisticasVerde.png",
  },
];

const itemsAdmin = [
  {
    title: "Ganado",
    url: "/users/admin/ganado",
    icon: "/assets/Admin/Ganado.png",
    iconBold: "/assets/Admin/GanadoVerde.png",
  },
  {
    title: "Empleados",
    url: "/users/admin/empleados",
    icon: "/assets/Admin/Empleados.png",
    iconBold: "/assets/Admin/EmpleadosVerde.png",
  },
  {
    title: "Ventas",
    url: "/users/admin/ventas",
    icon: "/assets/Admin/Ventas.png",
    iconBold: "/assets/Admin/VentasVerde.png",
  },
  {
    title: "Almacén",
    url: "/users/admin/almacen",
    icon: "/assets/Almacen/Almacen.png",
    iconBold: "/assets/Almacen/AlmacenVerde.png",
  },
  {
    title: "Estadísticas",
    url: "/users/admin/estadisticas",
    icon: "/assets/Almacen/Estadisticas.png",
    iconBold: "/assets/Almacen/EstadisticasVerde.png",
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

  const isadmin = pathname.toString().substring(0,12) == "/users/admin";
  const itemsChoice = isadmin ? itemsAdmin : itemsAlmacen;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <img src="/assets/Login/Logo.png" alt="" className="items-center w-20"/>
        </div>
        {/* <div className="flex items-center space-x-2 group-data-[collapsible=icon]:overflow-x-hidden">
          <img src="/assets/Login/Logo.png" alt="" width={40}/>
          <span className="text-2xl font-bold">Almacégf fdbdbd dfbdb</span>
        </div> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">{isadmin ? "Administrador" : "Almacen"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsChoice.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-2 hover:bg-[#ececec] mb-4 py-3">
                    <Link href={item.url}>
                      <img src={`${pathname == item.url ? item.iconBold : item.icon}`} alt="" className="w-8 h-auto" />
                      <span className={`${pathname == item.url ? 'text-acento font-bold' : ''} text-lg`} >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:overflow-x-hidden">
        <SidebarMenuItem key={"logout"}>
          <SidebarMenuButton onClick={handleLogout} disabled={logoutaction} className="hover:bg-[#eeeeee] mb-4">
            <img src="/assets/almacen/logout.svg" alt="" className="w-8 h-auto"/>
            <span className="overflow-hidden text-lg">{"Salir"}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
