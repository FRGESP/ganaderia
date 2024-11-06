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
      redirect("entradas");
      break;
    default:
      console.log("No se encontro el rol");
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

export const setReemoAction = async (reemo:string) => {
  const session = await getsession();
  session.reemo = reemo;
  await session.save();
  const response = await axios.post(`${process.env.URL}/api/entradas/${session.userId}`, reemo);
}

export const isReemoInSession = async () => {
  const session = await getsession();

  if(!session.reemo){
    return false
  } else {
    return true
  }
}

