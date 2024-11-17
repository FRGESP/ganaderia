import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req,{params}) {
    try{
        const result = await conn.query('CALL GETDIETAINFO(?)', params.id)
        return NextResponse.json([result[0][0], result[0][1], result[0][2]])
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