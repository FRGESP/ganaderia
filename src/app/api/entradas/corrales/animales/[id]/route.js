import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET(request, {params}) {
    try{
        const result = await conn.query(`CALL GETANIMALDATA(?)`, [params.id]);
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

export async function PUT(request, {params}) {
    try{
        const req = await request.json();
        console.log(req);
        const result = await conn.query(`CALL SP_UPDATEANIMAL(?,?,?,?,?)`, [params.id, req.Meses, req.Estado, req.Sexo, req.Peso]);
        return NextResponse.json({message: 'Animal actualizado'}, {status: 200})
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