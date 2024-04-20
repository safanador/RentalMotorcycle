import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/app/models/Users";
import { messages } from "@/app/utils/message";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt  from "jsonwebtoken";
import { LoginEmailTemplate } from "@/components/LoginEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY! as string)

export async function POST(request: NextRequest){
    try {
        const body:{email:string} = await request.json();

        const { email } = body;

        await connectMongoDB();
        const userFind = await User.findOne({email});

        //validar usuario existe
        if(!userFind){
            return NextResponse.json(
                {message:messages.error.userNotFound},
                {status:400}
            )
        }

        const tokenData = {
            email: userFind.email,
            userId:userFind._id,
        }

        const token = jwt.sign({data:tokenData}, process.env.JWT_API_KEY! as string,{expiresIn:86400});

        const forgetUrl = `${process.env.WEBSITE_DOMAIN! as string}/change-password?token=${token}`;

        //@ts-ignore
        await resend.emails.send({
            from:"info@sergioafanador.com.co",
            to:email,
            subject:"Cambio de contraseña",
            react: LoginEmailTemplate({buttonUrl:forgetUrl})
        });

        return NextResponse.json(
            {message: messages.success.emailSent},
            {status:200}
        );

    } catch (error) {
        return NextResponse.json(
            {message: messages.error.default,error},
            {status:400}
        );
    }
}