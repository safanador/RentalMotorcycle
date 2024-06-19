// api that goes to DB and returns tours that meet some validations

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any){
    const q = request.q
    console.log(q);
    if(!q){
        return NextResponse.json(
            {message: "No se ha recibido nada"},{status:400}
            );
    }
    return NextResponse.json(
        {message:"You have made it bro!"},{status:200}
        );
}