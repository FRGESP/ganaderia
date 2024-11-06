import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function POST(req, {params}) {
    try{
        const resquest = await req.json();
        console.log("Esta es"+resquest);
        const [result] = await conn.query(`CALL ADDGUIAENTRADA(?, ?)`, [resquest ,params.id])

        // if(result[0][0].res == 0){
        //     return NextResponse.json({
        //         message:`No se encontró al ${sujeto}`
        //     },
        //     {
        //         status:404
        //     }
        // )
        // }
        return new Response(null, {status:204})
    }catch(error)
    {
        console.log(error);
        return NextResponse.json({
            message:error
        },
        {
            status: 400
        }
    )
    }
}