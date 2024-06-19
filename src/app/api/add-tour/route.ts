//api that goes to DB and create a tour in it
import { connectMongoDB } from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server"; 
import { messages } from "@/app/utils/message";
import Tours, { ITourSchema } from "@/app/models/Tours";
//import RentBikes, { IRentalBikeSchema } from "@/app/models/Bike"; tourSchema

export async function POST(request:NextRequest){
    try {
        await connectMongoDB();

        const body = await request.json()
        const {title,price,operator,notIncluded,itinerary,initDirections,
            initAddress,included,imageUrl1,imageUrl2,imageUrl3,imageUrl4,imageUrl5,imageUrl6,imageUrl7,help,finalDirections,finalAddress,faq, description, cancelPolicy ,additionalInfo,accessibility   } = body;

        if( !title || !price || !operator || !notIncluded || !itinerary || !initDirections || !initAddress || !included || !imageUrl1 || !imageUrl2 || !imageUrl3 || !imageUrl4 || !imageUrl5 || !imageUrl6 || !imageUrl7 || !help || !finalDirections || !finalAddress || !faq || !description || !cancelPolicy || !additionalInfo || !accessibility   ){

            return NextResponse.json(
                {message:messages.error.needProps},{status:400}
                );
        }
         
        
        const newTour: ITourSchema = new Tours(
            {
                title,
                operator,
                description,
                included,
                notIncluded,
                itinerary,
                initAddress,
                initDirections,
                finalAddress,
                finalDirections,
                accessibility,
                additionalInfo,
                cancelPolicy,
                faq,
                help,
                price,
                imageUrl1,
                imageUrl2,
                imageUrl3,
                imageUrl4,
                imageUrl5,
                imageUrl6,
                imageUrl7,
            } 
        );
       
        await newTour.save()
        

        const response = NextResponse.json(
            {message: messages.success.tourCreated},{status: 200}
        );

        return response;
        
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default, error},
            {status:500}
        );
    }
}