import { NextResponse } from "next/server";
import {conn} from '@/lib/mysql'

export async function POST(req,) {
    try{
        const resquest = await req.json();
        const [res] = await conn.query('CALL CHECKIFREEMONOTEXISTS(?)', [resquest.ReemoIn]);
        return NextResponse.json(res[0][0])
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