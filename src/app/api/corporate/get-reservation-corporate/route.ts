import { connectMongoDB } from "@/app/libs/mongodb";
import Bookings from "@/app/models/Reservation";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const resQuery = request.nextUrl.searchParams.get("res")?.toString()
        console.log(resQuery);
        if( !resQuery){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }
        console.log("paso validacion if para existencia")
        await connectMongoDB();
        const res = await Bookings.find({
            $or: [
              //{ _id: { $regex: resQuery, $options: "i" } },
              { name: { $regex: resQuery, $options: "i" } },
              { phone: { $regex: resQuery, $options: "i" } },
              { email: { $regex: resQuery, $options: "i" } },
            ],
          })
          console.log("volvio de la base de datos")
          console.log(res)
        return NextResponse.json({res},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}