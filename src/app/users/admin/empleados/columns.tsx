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
import ButtonDelete from "@/components/ui/admin/Empleados/buttonDelete"
import ButtonEditEmpleados from "@/components/ui/admin/Empleados/buttonEdit"

const columnas = ["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Edad", "Telefono", "Rol", "Sueldo", "Estatus"]

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
            <div className="grid gap-1 grid-cols-2 text-black">
              <ButtonEditEmpleados id={fila.Id}/>
              <ButtonDelete id={fila.Id}/>
            </div>
          )
        },
      },
    // {
    //     accessorKey: "Acciones",
    //     header: "Acciones",
    // },  
]