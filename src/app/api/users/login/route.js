import { NextResponse } from "next/server"
import { conn } from "@/lib/mysql"

export async function POST(request) {
    try{
    
    const data = await request.json();
    const [result] = await conn.query('CALL LOGIN(?, ?);', [data.user, data.password])
    // if(result.length == 0) {
    //     return NextResponse.json({
    //         message: "Producto no encontrado"
    //     },
    //     {
    //         status:400
    //     }
    // )
    //}
    return NextResponse.json(result[0])
    }catch(error){
        return NextResponse.json({
            message: error
        },
        {
            status:400
        })
    }
}