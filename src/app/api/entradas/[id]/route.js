import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function POST(req,{params}) {
    try{
        const resquest = await req.json();

        console.log(resquest)
        const [res] = await conn.query('CALL ENTRADAANIMAL(?,?,?,?,?,?,?,?,?)', [params.id, resquest.ReemoSession, resquest.MotivoSession,resquest.CorralSession, resquest.SexoSession, resquest.areteInput, resquest.mesesInput, resquest.pesoInput, resquest.selectEstado]);
        return NextResponse.json(res[0][0])
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

export async function GET(request, {params}) {
    try{
        const [result] = await conn.query(`CALL LISTGANADO(?)`, [params.id]);
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