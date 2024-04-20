import { connectMongoDB } from "@/app/libs/mongodb";
import { messages } from "@/app/utils/message";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/Users";
import bcrypt from "bcryptjs";

interface BodyProps{
    newPassword:string,
    confirmPassword:string,
}

export async function POST(request: NextRequest){
    try {
        const body:BodyProps = await request.json();

        const {newPassword,confirmPassword} = body;
        //validar que esten todos los campos
        if(!newPassword || !confirmPassword){
            return NextResponse.json(
                {message:messages.error.needProps},
                {status:400}
            );
        }

        await connectMongoDB();

        const headersList = headers()
        const token = headersList.get("token")
        //verificar que haya toquen
        if(!token){
            return NextResponse.json(
                {message:messages.error.notAuthorized},
                {status:400}
            )
        }

        try {
            const isTokenValid = jwt.verify(token, process.env.JWT_API_KEY! as string);
           
            //@ts-ignore
            const { data } = isTokenValid;

            const userFind = await User.findById(data.userId);
            
            //validar que exista el usuario
            if(!userFind){
                return NextResponse.json(
                    {message:messages.error.userNotFound},
                    {status:400}
                );
            }
            //validar que contraseñas coincidan
            if(newPassword !== confirmPassword){
                return NextResponse.json(
                    {message:messages.error.passwordNotMatch},
                    {status:400}
                );
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            userFind.password = hashedPassword;

            await userFind.save();

            return NextResponse.json(
                {message:messages.success.passwordChanged},
                {status:200}
            );
        } catch (error) {
            return NextResponse.json(
                {message:messages.error.tokenNotValid, error},
                {status:400}
            );
        }
    } catch (error) {
        return NextResponse.json(
            {message:messages.error.default, error},
            {status:400}
        );
    }
    }
