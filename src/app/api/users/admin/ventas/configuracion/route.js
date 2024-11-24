import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req) {
    try{
        const [result] = await conn.query('CALL SP_GETCONFIGURACIONGANANCIA()')
        return NextResponse.json([result[0][0]])
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

export async function PUT(req) {
    try{
        const request = await req.json()
        const [result] = await conn.query('CALL SP_EDITCONFIGURATIONGANANCIA(?)', [request.Ganancia])
        return NextResponse.json({ message: 'Configuracion actualizada' }, { status: 200 })
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