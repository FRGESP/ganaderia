import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function PUT(req) {
    try{
        const request = await req.json()
        const [result] = await conn.query('CALL SP_GETARTICULOS(?)', [request.Nombre])
        return NextResponse.json([result[0]])
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