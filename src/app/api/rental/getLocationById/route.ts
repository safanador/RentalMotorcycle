import { connectMongoDB } from "@/app/libs/mongodb";
import Locations from "@/app/models/Location";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        const resQuery = request.nextUrl.searchParams.get("loc")?.toString()
       // console.log(resQuery);
        if( !resQuery){
            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }

        await connectMongoDB();
        const location = await Locations.findById(resQuery).exec();
        return NextResponse.json({location},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}