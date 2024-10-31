import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function GET(request, {params}) {
    try{
        const [result] = await conn.query(`CALL SP_GETEMPLEADOFORMAT(?)`, [params.id]);
        if(result[0].length === 0){
            return NextResponse.json({
                message:`No se encontró al ${sujeto}`
            },
            {
                status:404
            })
        }
        return NextResponse.json(result[0])
    }catch(error){
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}