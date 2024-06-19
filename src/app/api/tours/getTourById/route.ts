import { connectMongoDB } from "@/app/libs/mongodb";
import Tours from "@/app/models/Tours";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const resQuery = request.nextUrl.searchParams.get("id")?.toString()
       // console.log(resQuery);
        if( !resQuery){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }
       // console.log("paso validacion if para existencia")
        await connectMongoDB();
        const tour = await Tours.findById(resQuery).exec();
         //console.log("volvio de la base de datos")
        //  console.log(tour)
        return NextResponse.json({tour},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}