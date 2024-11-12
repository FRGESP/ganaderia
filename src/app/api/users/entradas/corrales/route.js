//Esta es la ruta que se encarga de obtener los nombres de los corrales en la parte del usuario y de la página users/entradas/corrales
import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'
import { request } from 'http'

export async function POST(req) {
    try{
        const request = await req.json()
        const result = await conn.query('CALL GETCORRRALES(?)',request.Nombre)
    return NextResponse.json(result[0][0])
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}

export async function PUT(req) {
    try{
        const request = await req.json();
        console.log(request);
        const [res] = await conn.query('CALL UPDATENAMECORRAL(?,?)', [request.Nombre, request.Id]);

        return NextResponse.json(res[0][0]);
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
