import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET() {
    try{
        const result = await conn.query('SELECT NOW() AS HORA')
    console.log(result[0]);
    return NextResponse.json({ message: result[0][0]['HORA'] })
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}