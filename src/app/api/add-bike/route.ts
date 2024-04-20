import { connectMongoDB } from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server"; 
import { messages } from "@/app/utils/message";
import RentBikes, { IRentalBikeSchema } from "@/app/models/Bike";

export async function POST(request:NextRequest){
    try {
        await connectMongoDB();

        const body = await request.json()
        const {name,brand,year,price,description,imageUrl,
                bikeType,odometer,location,} = body;

        if( !name || !brand || !year || !price || !description || !imageUrl || !bikeType || !odometer || !location ){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }
         
        
        const newRentalBike: IRentalBikeSchema = new RentBikes(
            {
                name,
                brand,
                year,
                price,
                description,
                imageUrl,
                bikeType,
                odometer,
                location,
            } 
        );
       
        await newRentalBike.save()
        

        const response = NextResponse.json(
            {message: messages.success.bikeCreated},{status: 200}
        );

        return response;
        
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default, error},
            {status:500}
        );
    }
}