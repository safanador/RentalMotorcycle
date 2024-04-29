'use server'
 
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
 
export async function DeleteCookie() {
  //const route = useRouter();
  cookies().delete('auth_cookie')
 // route.push("/login");
}
{/* 
import jwt from "jsonwebtoken";
import { messages } from '@/app/utils/message';
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request:NextRequest) {

  const headersList = headers();
  const token = headersList.get("token");
    if(!token){
      return NextResponse.json(
        {message:messages.error.notAuthorized},
        {status:400}
        );
    }
      try {
        jwt.verify(token, process.env.JWT_API_KEY! as string);
        const response = NextResponse.json(
          {message:messages.success.userLogged},
          {status:200}
      );

      response.cookies.set("auth_cookie", token,{
         secure:process.env.NODE_ENV === "production",
         sameSite:"strict",
         maxAge:0,
         path: "/",
      });

      return response;
  } catch (error) {
    return NextResponse.json(
      {message:messages.error.tokenNotValid, error},
      {status:400}
      )}
      
  }*/}

