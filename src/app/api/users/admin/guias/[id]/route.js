import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function GET(request, {params}) {
    try{
        const result = await conn.query(`CALL GETGUIADATA(?)`, [params.id]);
        if(result[0].length === 0){
            return NextResponse.json({
                message:`No se encontró al ${sujeto}`
            },
            {
                status:404
            })
        }
        return NextResponse.json([result[0][0],result[0][1]])
    }catch(error){
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}

export async function POST(request, {params}) {
    try{
        const req = await request.json()
        const result = await conn.query(`CALL CREATEGUIA(?,?,?,?,?,?,?)`, [params.id,req.Psg, req.Nombre, req.RazonSocial, req.Localidad, req.Municipio, req.Estado]);
        return NextResponse.json({message:'Guía creada', status:200})
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