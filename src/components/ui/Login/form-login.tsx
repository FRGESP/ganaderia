"use client";

import { z } from "zod"
import { LoginSchema } from '@/lib/zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from "@/actions"
import { AlertPro } from "@/components/ui/Login/alerts-login";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
function FormLogin() {

  const [showUserAlert, setUserAlert] = useState(false);
  const [showPasswordAlert, setPasswordAlert] = useState(false);
  const [showInfoAlert, setInfoAlert] = useState(false);

  const handleShowInfoAlert = (set:number) => {
    if(set == 0)
    {
      setInfoAlert(false);
    }else{
      setInfoAlert(true);
    }
    
  }

  const handleShowPasswordAlert = (set:number) => {
    if(set == 0)
    {
      setPasswordAlert(false);
    }else{
      setPasswordAlert(true);
    }
    
  }

  const handleShowUserAlert = (set:number) => {
    if(set == 0)
    {
      setUserAlert(false);
    }else{
      setUserAlert(true);
    }
    
  }

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          user: "",
            password: "",
        },
      })
      
      async function onSubmit(values: z.infer<typeof LoginSchema>) {
        const res = await login(values);
        handleShowUserAlert(0);
        handleShowPasswordAlert(0);
        handleShowInfoAlert(0);

        if(res== 0){
          handleShowUserAlert(1);
        } else if(res == 1){
          handleShowPasswordAlert(1);
        } else if(res == 2){
          handleShowInfoAlert(1);
        }
      }

      return <div >
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              {showUserAlert && <AlertPro variant={"danger"} tittle={"El usuario no está registrado"} body={"Verifique su usuario e intente de nuevo"}/>}
              {showPasswordAlert && <AlertPro variant={"danger"} tittle={"Contraseña incorrecta"} body={"Verifique su contraseña e intente de nuevo"}/>}
              {showInfoAlert && <AlertPro variant={"info"} tittle={"Cuenta inactiva o suspendida"} body={"Contacte con un supervisor para más detalles"}/>}
              <FormLabel className="text-xl">Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Toque aquí para ingresar su usuario" {...field} className="border-gray-950 rounded-xl text-xl p-7"autoFocus/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Toque aquí para ingresar su contraseña" {...field} className="border-gray-950 rounded-xl p-7 text-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-acento hover:bg-acentohover w-full p-7 text-xl rounded-full py-8">Ingresar</Button>
      </form>
    </Form>
      </div>
}

export default FormLogin