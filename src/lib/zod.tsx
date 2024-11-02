import { number, object, string } from "zod"
 
export const LoginSchema = object({
  user: string({ required_error: "Se requiere su usuario" })
    .min(1, "Se requiere su usuario")
    .max(50, "Su usuario debe ser menor a 50 caracteres"),
  password: string({ required_error: "Se requiere la contraseña" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})

export const EmpleadosEditSchema = object({
  Nombre: string({ required_error: "Se requiere su nombre" })
    .min(1, "Se requiere su nombre")
    .max(50, "Su nombre debe ser menor a 50 caracteres"),
  ApellidoPaterno: string({ required_error: "Se requiere su apellido paterno" })
    .min(1, "Se requiere su apellido paterno")
    .max(50, "Su apellido paterno debe ser menor a 50 caracteres"),
  ApellidoMaterno: string({ required_error: "Se requiere su apellido materno" })
    .min(1, "Se requiere su apellido materno")
    .max(50, "Su apellido materno debe ser menor a 50 caracteres"),
  Edad: string({ required_error: "Se requiere su edad" })
    .min(1, "Se requiere su edad")
    .max(3, "Su edad debe ser menor a 3 caracteres"),
  Telefono: string({ required_error: "Se requiere su telefono" })
    .min(10, "Ingrese su telefono de 10 digitos")
    .max(10, "Ingrese su telefono de 10 digitos"),
    Contraseña: string({ required_error: "Se requiere la contraseña" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
  Rol: string({ required_error: "Se requiere su rol" }),
  Sueldo: number({ required_error: "Se requiere su sueldo" }),
  Estatus: string({ required_error: "Se requiere su estatus" })
})

// export const EmpleadosEditSchema = object({
//   Nombre: string(),
//   ApellidoPaterno: string(),
//   ApellidoMaterno: string(),
//   Edad: string(),
//   Telefono: string(),
//     Contraseña: string(),
//   Rol: string(),
//   Sueldo: number(),
//   Estatus: string()
// })

export const RegisterSchema = object({
    Nombre: string({ required_error: "Se requiere su nombre" })
      .min(1, "Se requiere su nombre")
      .max(50, "Su nombre debe ser menor a 50 caracteres"),
    Telefono: string({ required_error: "Se requiere su telefono" })
      .min(10, "Ingrese su telefono de 10 digitos")
      .max(10, "Ingrese su telefono de 10 digitos"),
    Edad: string({ required_error: "Se requiere su edad" })
      .min(1, "Se requiere su edad")
      .max(3, "Su edad debe ser menor a 3 caracteres"),
    Rol: string({ required_error: "Se requiere su rol" })
      .min(1, "Se requiere su rol")
      .max(50, "Su rol debe ser menor a 50 caracteres"),
    Sueldo: number({ required_error: "Se requiere su sueldo" }),
    Estatus: string({ required_error: "Se requiere su estatus" })
      .min(1, "Se requiere su estatus")
      .max(50, "Su estatus debe ser menor a 50 caracteres"),
});