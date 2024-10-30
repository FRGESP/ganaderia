import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

const SPGET = 'SP_FINDEMPLEADO'
const SPDELETE = 'SP_DELEETEMPLEADO'
const SPPUT = 'SP_UPDATEEMPLEADO'
const sujeto = 'empleado'

export async function GET(request, {params}) {
    try{
        const [result] = await conn.query(`CALL ${SPGET}(?)`, [params.id]);
        if(result[0].length === 0){
            return NextResponse.json({
                message:`No se encontró al ${sujeto}`
            },
            {
                status:404
            })
        }
        return NextResponse.json(result[0])
    }catch(error){
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}

export async function DELETE(req,{params}) {
    try{
        const [result] = await conn.query(`CALL ${SPDELETE}(?)`, [params.id])
        console.log(result[0][0].res);

        if(result[0][0].res == 0){
            return NextResponse.json({
                message:`No se encontró al ${sujeto}`
            },
            {
                status:404
            }
        )
        }
        return new Response(null, {status:204})
    }catch(error)
    {
        return NextResponse.json({
            message:error
        },
        {
            status: 400
        }
    )
    }
}

export async function PUT(req,{params}) {
    try{
        const data = await req.json();
        data.IDINT = params.id;
        const values = Object.values(data);
        console.log(values);
        const result = await conn.query(`CALL ${SPPUT}(?)`,[values]);

        if(result.affectedRows === 0) {
            return NextResponse.json({
                message: `No se encontró al ${sujeto}`
            },
            {
                status:404
            }
        )
        }
        const [updatedEmpleado] = await conn.query(`CALL ${SPGET}(?)`, [params.id])

        return NextResponse.json(updatedEmpleado[0]);
    }catch(error)
    {
        return NextResponse.json({
            message: error
        },
        {
            status:500
        })
    }
}