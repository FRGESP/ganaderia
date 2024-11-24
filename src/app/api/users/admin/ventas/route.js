import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function POST(request) {
    try{
        const req = await request.json()
        const [result] = await conn.query('CALL SP_VENTA(?,?,?,?,?,?,?,?,?)',[req.Corral, req.Reemo, req.Precio, req.Psg, req.Nombre, req.Razon, req.Municipio, req.Localidad, req.Estado])
        return NextResponse.json({ message: 'Venta realizada' }, { status: 200 })
    } catch(error){
        console.log(error)
        return NextResponse.json({
            message: error
        },
        {
            status:400
        })
    }
}