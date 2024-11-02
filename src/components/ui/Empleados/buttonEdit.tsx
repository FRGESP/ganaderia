"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

import React, { useEffect } from "react";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface ButtonEditEmpleadosProps {
  id: string;
}

function ButtonEditEmpleados({ id }: ButtonEditEmpleadosProps) {
  const [open, setOpen] = React.useState(false);

  const { toast } = useToast();
  const [empleado, setEmpleado] = useState({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Edad: "",
    Telefono: "",
    Rol: "2",
    Sueldo: 1,
    Estatus: "1",
  });

  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleChange = (e: any) => {
    //console.log(e.target.value, e.target.name)
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(`/api/users/admin/empleados/${id}`).then((response) => {
      setEmpleado({
        Nombre: response.data.Nombre,
        ApellidoPaterno: response.data.ApellidoPaterno,
        ApellidoMaterno: response.data.ApellidoMaterno,
        Edad: response.data.Edad,
        Telefono: response.data.Telefono,
        Rol: response.data.Rol.toString(),
        Sueldo: response.data.Sueldo,
        Estatus: response.data.Estatus.toString(),
      });
    });
  }, []);

  // const setInfo = async () => {
  //   const response = await axios.get(`/api/users/admin/empleados/${id}`);
  //   setEmpleado({
  //     Nombre: response.data.Nombre,
  //     ApellidoPaterno: response.data.ApellidoPaterno,
  //     ApellidoMaterno: response.data.ApellidoMaterno,
  //     Edad: response.data.Edad,
  //     Telefono: response.data.Telefono,
  //     Rol: response.data.Rol.toString(),
  //     Sueldo: response.data.Sueldo,
  //     Estatus: response.data.Estatus.toString(),
  //   });
  // }

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.put(`/api/users/admin/empleados/${id}`, empleado);
    if (res.data == 1) {
      toast({
        title: "Empleado Actualizado",
        description: "El empleado ha sido actualizado correctamente",
        variant: "success",
      });
      router.refresh();
    } else {
      toast({
        title: "Error al actualizar el empleado",
        description: "Hubo un error al actualizar el empleado",
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]">
          <Edit className="text-yellow-600 size-7" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col items-center justify-center ">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll h-[500px] w-[450px] rounded-md border shadow-lg p-5 m-1 bg-white scroll-smooth scroll-dialog">
          <form className=" rounded-md mb-4" onSubmit={handlesubmit} ref={form}>
            <label
              htmlFor="Nombre"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Nombre
            </label>
            <input
              value={empleado.Nombre}
              type="text"
              id="Nombre"
              name="Nombre"
              placeholder="Nombre"
              onChange={handleChange}
              className=" border rounded w-full py-2 px-3 text-black border-black"
              autoFocus
            />

            <label
              htmlFor="ApellidoPaterno"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Apellido Paterno
            </label>
            <input
              value={empleado.ApellidoPaterno}
              type="text"
              id="ApellidoPaterno"
              name="ApellidoPaterno"
              placeholder="ApellidoPaterno"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black border-black"
            />

            <label
              htmlFor="ApellidoMaterno"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Apellido Materno
            </label>
            <input
              value={empleado.ApellidoMaterno}
              type="text"
              id="ApellidoMaterno"
              name="ApellidoMaterno"
              placeholder="ApellidoMaterno"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black border-black"
            />

            <label
              htmlFor="Edad"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Edad
            </label>
            <input
              value={empleado.Edad}
              type="number"
              id="Edad"
              name="Edad"
              placeholder="Edad"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black border-black"
            />

            <label
              htmlFor="Telefono"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Teléfono
            </label>
            <input
              value={empleado.Telefono}
              type="number"
              id="Telefono"
              name="Telefono"
              placeholder="Telefono"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black border-black"
            />

            <label
              htmlFor="Sueldo"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Sueldo
            </label>
            <input
              value={empleado.Sueldo}
              type="number"
              id="Sueldo"
              name="Sueldo"
              placeholder="Sueldo"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black border-black "
            />

            <label
              htmlFor="Rol"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Rol
            </label>
            <select
              name="Rol"
              id="Rol"
              value={empleado.Rol}
              onChange={handleChange}
              className="w-full border border-black py-2 rounded-md"
            >
              <option value={"1"}>Administrador</option>
              <option value={"2"}>Almacen</option>
              <option value={"3"}>Entradas</option>
            </select>

            <label
              htmlFor="Estatus"
              className="block text-gray-700 text-sm font-bold my-2"
            >
              Estatus
            </label>
            <select
              name="Estatus"
              id="Estatus"
              value={empleado.Estatus}
              onChange={handleChange}
              className="w-full border border-black py-2 rounded-md"
            >
              <option value={"1"}>Activo</option>
              <option value={"2"}>Despedido</option>
              <option value={"3"}>Suspendido</option>
            </select>

            <button className="bg-acento hover:bg-acentohover w-full p-4 text-md text-white rounded-full py-3 mt-4">
              Actualizar
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonEditEmpleados;
