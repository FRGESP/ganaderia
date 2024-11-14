import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"
import { stat } from "fs";

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

export async function PUT(req) {
    try{
        const request = await req.json()
        const result = await conn.query('CALL UPDATEPRECIOCOMPRAANIMAL(?,?)',[request.Arete,request.Precio]);
    return NextResponse.json({ message: 'Precio actualizado', status: 200 })
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}