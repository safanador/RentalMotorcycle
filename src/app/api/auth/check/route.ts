import { messages } from "@/app/utils/message";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/app/models/Users";

export async function GET(){
    try {
        const headersList = headers();
        const token = headersList.get("token");
        //validar que haya token
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
            const userFind = await User.findById(data._id);
            // validar que usuario exista
            if(!userFind){
                return NextResponse.json(
                    {message:messages.error.userNotFound},
                    {status:400}
                );
            }

            return NextResponse.json(
                {isAuthorized: true, message:messages.success.authorized},
                {status:200}
            )
        } catch (error) {
            return NextResponse.json(
                {message:messages.error.tokenNotValid, error},
                {status:400}
            )
        }
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default},
            {status:400}
        )
    }
}