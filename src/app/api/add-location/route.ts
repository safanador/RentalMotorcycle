import { connectMongoDB } from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server"; 
import { messages } from "@/app/utils/message";
import Location, { ILocationSchema } from "@/app/models/Location";


export async function POST(request:NextRequest){
    try {
        await connectMongoDB();

        const body = await request.json()
        const {name, address, telephone,latitude, longitude} = body;

        if( !name || !address || !telephone || !latitude || !longitude){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }

        const newLocation: ILocationSchema = new Location(
            {
                name,
                address,
                telephone,
                latitude,
                longitude,
            } 
        );

        await newLocation.save()
        const response = NextResponse.json(
            {message: messages.success.locationCreated},{status: 200}
        );

        return response;
        
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default, error},
            {status:500}
        );
    }
}