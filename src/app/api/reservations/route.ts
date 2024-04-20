"use server"
import { connectMongoDB } from "@/app/libs/mongodb";
import { messages } from "@/app/utils/message";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Reservations from "@/app/models/Reservation";


export async function GET(){
   
    try {
        const headersList = headers();
        const token = headersList.get("token");
        if(!token){
            return NextResponse.json(
                {message:messages.error.notAuthorized},
                {status:400}
            );
        }

        try {
            const isTokenValid = jwt.verify(token, process.env.JWT_API_KEY! as string);

            //@ts-ignore
            const { data } = isTokenValid;

            await connectMongoDB()
            const resFind = await Reservations.find({email: data.email});
            // validar que existan reservas
            if(!resFind){
                return NextResponse.json(
                    {message:messages.error.noReservationsFound},
                    {status:400}
                );
            }
             const reservations = resFind;
             
             return NextResponse.json({reservations},{status:200});

        } catch (error) {
            return NextResponse.json(
                {message:messages.error.tokenNotValid, error},
                {status:400}
                )}

    } catch (error) {
        return NextResponse.json(
        {message:messages.error.default},
        {status:500}
       ) 
    }
}