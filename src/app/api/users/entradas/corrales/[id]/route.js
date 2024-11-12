import { NextResponse } from 'next/server'
import { conn } from '@/lib/mysql'

export async function GET(req,{params}) {
    try{
        console.log(params.id)
        const result = await conn.query('CALL GETCORRALESDATA(?)',[params.id])
    return NextResponse.json([result[0][0],result[0][1]])
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
    
}