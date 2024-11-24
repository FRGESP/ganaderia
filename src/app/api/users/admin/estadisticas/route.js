import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req) {
    try{
        const [result] = await conn.query('CALL SP_GETESTADISTICAS()');
    return NextResponse.json([result[0],result[1]])
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}