import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET(request, {params}) {
    try{
        const result = await conn.query(`CALL SP_GETMEDICAMENTOOPTIONS()`);
        return NextResponse.json(result[0])
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

export async function POST(request, {params}) {
    try{
        const req = await request.json();
        const result = await conn.query(`CALL SP_ADDHISTORIALMEDICO(?, ?, ?, ?)`,[req.Arete, req.Medicamento, req.Cantidad, req.Empleado]);
        return NextResponse.json(result[0])
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