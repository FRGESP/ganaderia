import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"
import { console } from "inspector"

export async function GET(req) {
    try{
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

export async function POST(req) {
    try{
        const request = await req.json()

        if(request.Metodo === 1){
            const result = await conn.query('CALL ADDARTICULOTODIETA(?,?,?)', [request.IdDieta, request.IdArticulo, request.Cantidad])
            return NextResponse.json({ message: 'Articulo agregado a la dieta' }, { status: 200 })
        }

        const result = await conn.query('CALL ADDINGDIETATOCORRAL(?,?)', [request.IdDieta, request.Corral])
        return NextResponse.json({ message: 'Dieta agregada al corral' }, { status: 200 })

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
        console.log(request)
            const result = await conn.query('CALL EDITCANTIDADFROMDIETA(?,?)', [request.Id, request.Cantidad])
            return NextResponse.json({ message: 'Articulo agregado a la dieta' }, { status: 200 })

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
