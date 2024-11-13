import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function POST(req) {
    try{
        const request = await req.json()
        const result = await conn.query('CALL GETGUIAS(?,?)',[request.selectFilter,request.inputReemo]);
    return NextResponse.json(result[0][0])
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}