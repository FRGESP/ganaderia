"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmpleadosEditSchema } from "@/lib/zod";
import { Separator } from "@radix-ui/react-separator";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";


export function EmpleadosAddForm() {
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof EmpleadosEditSchema>>({
    resolver: zodResolver(EmpleadosEditSchema),
    defaultValues: {
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      Edad: "",
      Telefono: "",
      Rol: "0",
      Sueldo: 1,
      Estatus: "0",
      Contraseña: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EmpleadosEditSchema>) {
    const response = await axios.post(
      `/api/users/admin/empleados/add`,
      values
    );
    if(response.data.RES !== 1){
      toast({
        title: "Empelado agregado con éxito",
        description: "El empleado se ha agregado correctamente",
        variant: "success",
      });
      router.refresh();
    } else {
      toast({
        title: "Error al agregar empleado",
        description: "Hubo un error al agregar el empleado",
        variant: "destructive",
      });
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="border border-[#555555]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ApellidoPaterno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Paterno</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="border border-[#555555]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ApellidoMaterno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Materno</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="border border-[#555555]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Edad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="border border-[#555555]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="border border-[#555555]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="Contraseña"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="border border-[#555555]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Rol"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Rol</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <SelectTrigger className="w-[180px] border-[#555555] text-black">
                    <SelectValue placeholder="Rol"/>
                  </SelectTrigger>
                  <SelectContent className="border border-[#555555]">
                    <SelectItem value="1" >Administrador</SelectItem>
                    <Separator/>
                    <SelectItem value="2" >Almacen</SelectItem>
                    <SelectItem value="3" >Entradas</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Estatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estatus</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className=" border-[#555555] text-black w-full">
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent className="border border-[#555555]">
                    <SelectItem value="1">Activo</SelectItem>
                    <SelectItem value="2">Suspendido</SelectItem>
                    <SelectItem value="3">Despedido</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-acento hover:bg-acentohover w-full p-4 text-md rounded-full py-6">Agregar</Button>
      </form>
    </Form>
  );
}
