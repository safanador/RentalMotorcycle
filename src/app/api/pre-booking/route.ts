// feature en prueba
import { connectMongoDB } from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server"; 
import { messages } from "@/app/utils/message";
import RentBikes, { IRentalBikeSchema } from "@/app/models/Bike";
import PreReservation, { IPreReservationSchema } from "@/app/models/PreBooking";

export async function POST(request:NextRequest){
    try {
        await connectMongoDB();

        const body = await request.json()
        const {bikeId, dropOffDate,dropOffTime,email,locationId,phoneNumber,pickUpDate,pickUpTime} = body;

        if( !bikeId || !dropOffDate || !dropOffTime || !email || !locationId || !phoneNumber || !pickUpDate || !pickUpTime){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }
         
        
        const newPreReservation: IPreReservationSchema = new PreReservation(
            {
                bikeId,
                locationId,
                pickUpDate,
                pickUpTime,
                dropOffDate,
                dropOffTime,
                email,
                phoneNumber,
            } 
        );
       
        await newPreReservation.save()
        

        const response = NextResponse.json(
            {message: messages.success.prereservationCreated},{status: 200}
        );

        return response;
        
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default, error},
            {status:500}
        );
    }
}