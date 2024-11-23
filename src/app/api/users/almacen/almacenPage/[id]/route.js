import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function DELETE(req, {params}) {
    try{
        const [result] = await conn.query('CALL SP_DELETEARTICULO(?)', [params.id])
        return NextResponse.json({ message: 'Articulo eliminado' }, { status: 200 })
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