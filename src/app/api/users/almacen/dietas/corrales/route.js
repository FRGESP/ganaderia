import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";

export async function PUT(req, { params }) {
    try {
        const request = await req.json();
      const result = await conn.query("CALL DELETEDIETAFROMCORRAL(?)", [
        request.Corral,
      ]);
      return NextResponse.json(
        { message: "Corral eliminado de la dieta" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: error,
        },
        {
          status: 400,
        }
      );
    }
  }