import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function POST(req) {
    try{
        const resquest = await req.json();
        const res = await conn.query('CALL ADDUSER(?,?,?,?,?,?,?,?,?)', [resquest.Nombre, resquest.ApellidoPaterno, resquest.ApellidoMaterno,resquest.Telefono, resquest.Edad, resquest.Rol, resquest.Sueldo, resquest.Estatus, resquest.Contraseña]);
        if(res[0][0].res == 0){
            return NextResponse.json({
                message:`Hubo un error al agregar al empleado`
            },
            {
                status:404
            }
        )
        }

        return new Response(res[0][0].res, {status:204})
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}