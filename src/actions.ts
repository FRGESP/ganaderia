"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginSchema } from "@/lib/zod";

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
  console.log("S");
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

    await session.save();
    await roles();
  }
};

export const roles = async () => {
  const session = await getsession();
  console.log(session.rol);
  switch (session.rol) {
    case 1:
      redirect("/users/admin");
      break;
    case 2:
      redirect("/users/almacen");
      break;
    case 3:
      redirect("/users/ventas");
      break;
    default:
      console.log("No se encontro el rol");
      redirect("/");
  }
};
export const logout = () => {};
