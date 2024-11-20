import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET(req,{params}) {
    try{
        const result = await conn.query('CALL GETCORRALESDATA(?)',[params.id])
    return NextResponse.json([result[0][0],result[0][1]])
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}

export async function PUT(req, {params}) {
    try{
        const request = await req.json();
        const [res] = await conn.query('CALL UPDATEDIETACORRAL(?,?)', [params.id, request.Dieta]);

        return NextResponse.json({
            message: 'Corral actualizado'
        },
        {
            status:200
        })
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

export async function POST(req, {params}) {
    try{
        const request = await req.json();
        const [res] = await conn.query('CALL SP_ADDCORRAL(?)', [request.Nombre]);

        return NextResponse.json({
            message: 'Corral creado'
        },
        {
            status:200
        })
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

export async function DELETE(req, {params}) {
    try{
        const [res] = await conn.query('CALL SP_DELETECORRAL(?)', [params.id]);

        return NextResponse.json({
            message: 'Corral Eliminado'
        },
        {
            status:200
        })
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