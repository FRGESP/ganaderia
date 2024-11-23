"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import axios from "axios";

interface Credentials {
  user: string;
  password: string;
}

export const getsession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.islogged) {
    session.islogged = defaultSession.islogged;
  }
  return session;
};
export const login = async (credentials: Credentials) => {
  const session = await getsession();

  const response = await axios.post(
    `${process.env.URL}/api/users/login`,
    credentials
  );
  const [datos] = response.data;

  if (datos.RES !== undefined) {
    return datos.RES;
  } else {
    session.userId = datos.IdUsuario;
    session.rol = datos.Rol;
    session.islogged = true;
    session.name = datos.Nombre;
    session.lastname = datos.Apellido;

    await session.save();
    await roles();
  }
};

export const roles = async () => {
  const session = await getsession();
  switch (session.rol) {
    case 1:
      redirect("users/admin/ganado");
      break;
    case 2:
      redirect("users/almacen/almacenpage");
      break;
    case 3:
      redirect("users/entradas/guias");
      break;
    default:
      console.log("No se encontró el rol");
      redirect("/");
  }
};
export const logout = async () => {
  const session = await getsession();
  session.destroy();
  redirect("/");
};

export const islogged = async () => {
  const session = await getsession();

  if(!session.islogged){
    redirect("/");
  }
}

export const checkRole = async (rol:number) => {
  const session = await getsession();
  if(session.rol != rol) {
    redirect('/');
  }
}

export const getId = async () => {
  const session = await getsession();
  const id = session.userId;
  return id?.toString()
  
}

export const getIds = async () => {
  const session = await getsession();
  return session.rol;
}

export const setReemoAction = async (reemo:string, motivo:string, corral:string, sexo:string) => {
  const response = await axios.post(`${process.env.URL}/api/entradas`, {ReemoIn: reemo});
  const session = await getsession();
  if(response.data.RES == 1){
    session.reemo = reemo;
  session.motivo = motivo;
  session.corral = corral;
  session.sexoAnimal = sexo;
  await session.save();
  return true
  } else {
    return false
  }
  
}

export const isReemoInSession = async () => {
  const session = await getsession();
  if(!session.reemo){
    return false
  } else {
    return true
  }
}

export const getReemo = async () => {
  const session = await getsession();
  const response = await axios.post(`${process.env.URL}/api/entradas/corrales`,{Motivo: session.motivo, Corral: session.corral});
  return {reemo: session.reemo, motivo: session.motivo, corral: session.corral, sexo: session.sexoAnimal, corralChar: response.data.CorralChar, motivoChar: response.data.MotivoChar};
}

//Agregar animales
export const addAnimal = async (animal:any) => {
  const session = await getsession();
  animal.MotivoSession = session.motivo;
  animal.CorralSession = session.corral;
  animal.SexoSession = session.sexoAnimal;
  animal.ReemoSession = session.reemo;
  const response = await axios.post(`${process.env.URL}/api/entradas/${session.userId}`, animal);
  return response.data;
};

//Obtener lista de animales
export const getAnimalsList = async () => {
  const session = await getsession();
  const response = await axios.get(`${process.env.URL}/api/entradas/${session.reemo}`);
  return response.data;
}

//Elimina el Reemo de la session
export const deleteReemo = async () => {
  const session = await getsession();
  session.reemo = "";
  session.motivo = "";
  session.corral = "";
  session.sexoAnimal = "";
  await session.save();
}

//Añadir un lote
export const addLote = async (articulo:number, cantidad:any, precio:any) => {
  const session = await getsession();
  const response = await axios.post(`${process.env.URL}/api/users/almacen/almacenPage/lotes/${articulo}`, {Cantidad: cantidad, Precio: precio, Empleado: session.userId, Metodo: "Add"});
  return response.status;
}
