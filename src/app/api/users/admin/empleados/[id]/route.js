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
        return NextResponse.json(result[0][0])
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
        const resquest = await req.json();
        const [res] = await conn.query('CALL SP_UPDATEEMPLEADO(?,?,?,?,?,?,?,?,?)', [resquest.Nombre, resquest.ApellidoPaterno, resquest.ApellidoMaterno,resquest.Edad,resquest.Telefono,  resquest.Rol, resquest.Sueldo, resquest.Estatus, params.id]);
        
        if(res[0][0].res == 0) {
            return NextResponse.json({
                message: `No se encontró al ${sujeto}`
            },
            {
                status:404
            }
        )
        }

        return NextResponse.json(res[0][0].res);
    }catch(error)
    {
        console.log(error);
        return NextResponse.json({
            message: error
        },
        {
            status:501
        })
    }
}