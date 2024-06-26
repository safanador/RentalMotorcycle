import { connectMongoDB } from "@/app/libs/mongodb";
import RentBikes from "@/app/models/Bike";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const resQuery = request.nextUrl.searchParams.get("loc")?.toString()
        if( !resQuery){
            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }

        await connectMongoDB();
        const bike = await RentBikes.find({ location: resQuery }).exec();
        return NextResponse.json({bike},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}