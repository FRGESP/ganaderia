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

export async function POST(req) {
    try{
        const request = await req.json()
        const [result] = await conn.query('CALL SP_ADDARTICULO(?, ?)', [request.Nombre, request.Unidad])
        return NextResponse.json({ message: 'Articulo agregado' }, { status: 200 })
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

