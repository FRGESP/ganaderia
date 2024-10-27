"use client";

import { z } from "zod"
import { LoginSchema } from '@/lib/zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from "@/actions"


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
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          user: "",
            password: "",
        },
      })
      
      async function onSubmit(values: z.infer<typeof LoginSchema>) {
        login(values);
        console.log(values)
      }

      return <div >
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
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