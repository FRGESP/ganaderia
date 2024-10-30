import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function GET() {
    try{
        const [result] = await conn.query('CALL SP_EMPLEADOSVISTA()')
    return NextResponse.json(result[0])
    } catch(error){
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}