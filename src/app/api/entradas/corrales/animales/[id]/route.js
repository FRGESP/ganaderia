import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET(request, {params}) {
    try{
        const result = await conn.query(`CALL GETANIMALDATA(?)`, [params.id]);
        return NextResponse.json(result[0])
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:error
        },
        {
            status:500
        })
    }
}