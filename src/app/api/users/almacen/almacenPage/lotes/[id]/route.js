import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function GET(req, {params}) {
    try{
        const result = await conn.query('CALL SP_GETLOTES(?)',[params.id])
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

export async function POST(req, {params}) {
    try{
        const request = await req.json()
        if(request.Metodo === 'Name'){
            const result = await conn.query('CALL SP_UPDATENAMEARTICULO(?, ?)',[params.id, request.Nombre])
            return NextResponse.json({ message: 'Nombre actualizado' }, { status: 200 })
        } 
        if(request.Metodo === 'Add'){
            const result = await conn.query('CALL SP_ADDLOTE(?, ?, ?, ?)',[params.id, request.Cantidad, request.Precio, request.Empleado])
            return NextResponse.json({ message: 'Lote Agregado' }, { status: 200 })
        }
        
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

export async function PUT(req, {params}) {
    try{
        const request = await req.json()
        const result = await conn.query('CALL SP_UPDATECANTIDADLOTE(?, ?)',[params.id, request.Cantidad])
        return NextResponse.json({ message: 'Cantidad actualizada' }, { status: 200 })
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

export async function DELETE(req, {params}) {
    try{
        const result = await conn.query('CALL SP_DELETELOTE(?)',[params.id])
        return NextResponse.json({ message: 'Lote Eliminado' }, { status: 200 })
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

