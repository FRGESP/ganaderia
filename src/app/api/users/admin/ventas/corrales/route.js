import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req) {
    try{
        const [result] = await conn.query('CALL SP_GETCORRALESVENTA()')
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

export async function POST(req) {
    try{
        const request = await req.json()
        const [result] = await conn.query('CALL SP_GETCORRALVENTADATA(?)',[request.Corral])
        return NextResponse.json([result[0], result[1]])
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