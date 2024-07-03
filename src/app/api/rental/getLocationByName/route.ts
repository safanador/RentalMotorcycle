import { connectMongoDB } from "@/app/libs/mongodb";
import Locations from "@/app/models/Location";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        const resQuery = request.nextUrl.searchParams.get("name")?.toString()
       // console.log(resQuery);
        if( !resQuery){
            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }

        await connectMongoDB();
        const locations = await Locations.find({ name: new RegExp(resQuery, 'i') });
        return NextResponse.json({locations},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}