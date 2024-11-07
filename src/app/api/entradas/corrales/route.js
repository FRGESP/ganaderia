import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET() {
    try{
        const result = await conn.query('CALL OBTENERNOMBRECORRALES')
        console.log(result[0][0])
    return NextResponse.json(result[0][0])
    }catch(error){
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}

export async function POST(req) {
    const data = await req.json();
    try{
        const [result] = await conn.query('CALL OBTENERINFOSESSIONENTRADAS(?,?)', [data.Motivo, data.Corral]);
    return NextResponse.json(result[0][0])
    } catch(error){
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}