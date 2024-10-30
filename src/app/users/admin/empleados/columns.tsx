"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Plus } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

export type Empleados = {
  Id: string
  Nombre: string
  Edad: string
  Telefono: string
  Rol: "Administrador" | "Almacen" | "Entradas"
  Sueldo: number
  Estatus: "Activo" | "Suspendido" | "Despedido"
//   Acciones: undefined
}
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ButtonIcon } from "@/components/ui/buttonIcon"
import ButtonAction from "@/components/ui/buttotAction"
export const columns: ColumnDef<Empleados>[] = [
  {
    accessorKey: "Id",
    header: "Id",
  },
  {
    accessorKey: "Nombre",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "Edad",
    header: "Edad",
},
  {
    accessorKey: "Telefono",
    header: "Telefono",
  },
  {
    accessorKey: "Rol",
    header: "Rol",
},
    {
      accessorKey: "Sueldo",
      header: () => <div className="">Sueldo</div>,
      cell: ({ row }) => {
        const Sueldo = parseFloat(row.getValue("Sueldo"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Sueldo)
   
        return <div className="font-medium">{formatted}</div>
      },
    },
  
    {
        accessorKey: "Estatus",
        header: "Estatus",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const fila = row.original
     
          return (
            // <DropdownMenu>
            //   <DropdownMenuTrigger asChild>
            //     <Button variant="ghost" className="h-8 w-8 p-0">
            //       <span className="sr-only">Open menu</span>
            //       <MoreHorizontal className="h-4 w-4" />
            //     </Button>
            //   </DropdownMenuTrigger>
            //   <DropdownMenuContent align="end">
            //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
            //     <DropdownMenuItem
            //       onClick={() => navigator.clipboard.writeText(payment.Id)}
            //     >
            //       Copy payment ID
            //     </DropdownMenuItem>
            //     <DropdownMenuSeparator />
            //     <DropdownMenuItem>View customer</DropdownMenuItem>
            //     <DropdownMenuItem>View payment details</DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>
            <div className="grid gap-1 grid-cols-2 text-black">
              <ButtonAction action="edit" id={fila.Id}/>
              <ButtonAction action="delete" id={fila.Id}/>
            </div>
          )
        },
      },
    // {
    //     accessorKey: "Acciones",
    //     header: "Acciones",
    // },  
]