import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import { writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

cloudinary.config({
  cloud_name: "drgv7auw9",
  api_key: "937922283258255",
  api_secret: process.env.IMAGES,
});

export async function GET(request, { params }) {
  try {
    const result = await conn.query(`CALL GETGUIADATA(?)`, [params.id]);
    if (result[0].length === 0) {
      return NextResponse.json(
        {
          message: `No se encontró alguna guía con el id ${params.id}`,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json([result[0][0], result[0][1], result[0][2]]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const req = await request.formData();
    const file = req.get("file");
    let URLImage = 1;

    if(file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = path.join(process.cwd(), "public", file.name);
        await writeFile(filepath, buffer);
        const resImage = await cloudinary.uploader.upload(filepath);
        await fs.unlink(filepath);
        URLImage = resImage.secure_url;
    }
    
    const result = await conn.query(`CALL CREATEGUIA(?,?,?,?,?,?,?,?)`, [
      params.id,
      req.get("PSG"),
      req.get("Nombre"),
      req.get("RazonSocial"),
      req.get("Localidad"),
      req.get("Municipio"),
      req.get("Estado"),
      URLImage,
    ]);
    return NextResponse.json({ message: "Guía creada", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
