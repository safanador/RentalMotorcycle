import { connectMongoDB } from "@/app/libs/mongodb";
import Locations from "@/app/models/Location";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        await connectMongoDB();
        const locations = await Locations.find();
        return NextResponse.json({locations},{status:200});
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:500}
        );
    }
}