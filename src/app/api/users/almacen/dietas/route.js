import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req) {
    try{
        console.log('GETDIETAOPTIONS')
        const result = await conn.query('CALL GETDIETAOPTIONS()')
        return NextResponse.json([result[0][0], result[0][1]])
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