"use client";
import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface EmpleadoProps {
    Id: string;
}

export function EmpleadoEditForm({Id}:EmpleadoProps) {
    const { toast } = useToast();
    const [empleado,setEmpleado] = useState({
        Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Edad: "",
    Telefono: "",
    Rol: "2",
    Sueldo: 1,
    Estatus: "1",
    })

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e:any) => {
        //console.log(e.target.value, e.target.name)
        setEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=> {
      axios.get(`/api/users/admin/empleados/${Id}`).then((response) => {
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
    },[])

    const  handlesubmit = async (e:any) => {
        // e.preventDefault();
        const res = await axios.put(`/api/users/admin/empleados/${Id}`, empleado);
        if (res.data == 1) {
            toast({
              title: "Empleado Actualizado",
              description: "El empleado ha sido eliminado correctamente",
              variant: "success",
            });
          } else {
            toast({
              title: "Error al actualizar el empleado",
              description: "Hubo un error al eliminar el empleado",
              variant: "destructive",
            });
          }
        // console.log(res);
        // // form.current && form.current.reset();
        console.log(empleado);
        // router.refresh();
    }
  return (
    <div className=''>
    <form className='bg-white shadow-md rounded-md mb-4' onSubmit={handlesubmit} ref={form}>
      <label htmlFor="Nombre" className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
      <input value={empleado.Nombre} type="text" id="Nombre" name="Nombre" placeholder='Nombre' onChange={handleChange} className=' border rounded w-full py-2 px-3 text-black border-black' autoFocus/>

      <label htmlFor="ApellidoPaterno" className='block text-gray-700 text-sm font-bold my-2' >Apellido Paterno</label>
      <input value={empleado.ApellidoPaterno} type="text" id="ApellidoPaterno" name="ApellidoPaterno" placeholder='ApellidoPaterno' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black' />

      <label htmlFor="ApellidoMaterno" className='block text-gray-700 text-sm font-bold my-2' >Apellido Materno</label>
      <input value={empleado.ApellidoMaterno} type="text" id="ApellidoMaterno" name="ApellidoMaterno" placeholder='ApellidoMaterno' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black'/>

      <label htmlFor="Edad" className='block text-gray-700 text-sm font-bold my-2' >Edad</label>
      <input value={empleado.Edad} type="text" id="Edad" name="Edad" placeholder='Edad' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black'/>

      <label htmlFor="Telefono" className='block text-gray-700 text-sm font-bold my-2' >Telefono</label>
      <input value={empleado.Telefono} type="text" id="Telefono" name="Telefono" placeholder='Telefono' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black'/>

      <label htmlFor="Sueldo" className='block text-gray-700 text-sm font-bold my-2'>Sueldo</label>
      <input value={empleado.Sueldo} type="Sueldo" id="Sueldo" name="Sueldo" placeholder='Sueldo' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black '/>

      <label htmlFor="Rol" className='block text-gray-700 text-sm font-bold my-2' >Rol</label>
      <input value={empleado.Rol} type="text" id="Rol" name="Rol" placeholder='Rol' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black'/>

      <label htmlFor="Estatus" className='block text-gray-700 text-sm font-bold my-2' >Estatus</label>
      <input value={empleado.Estatus} type="Estatus" id="Estatus" name="Estatus" placeholder='Estatus' onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black border-black'/>

      <button className='bg-acento hover:bg-acentohover w-full p-4 text-md rounded-full py-3 mt-4'>Actualizar</button>

    </form>
  </div>
  )
}

