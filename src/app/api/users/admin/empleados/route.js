import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'
import { getId, getsession } from "@/actions";

export async function POST(req) {
    const data = await req.json();
    try{
        const [result] = await conn.query('CALL SP_EMPLEADOSVISTA(?)', data);
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

