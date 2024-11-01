"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import React, { use, useEffect } from "react";
import { EmpleadoEditForm } from "./empleadosEditForm";

interface ButtonEditEmpleadosProps {
    id: string;
}

function ButtonEditEmpleados({id}: ButtonEditEmpleadosProps) {
  const [open, setOpen] = React.useState(false);






  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]" >
      <Edit className="text-yellow-600 size-7"/></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col items-center justify-center ">
        <DialogHeader>
          <DialogTitle>Agregar Empleado</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] w-[450px] rounded-md border p-5 m-1">
          <EmpleadoEditForm Id={id}/>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonEditEmpleados;
