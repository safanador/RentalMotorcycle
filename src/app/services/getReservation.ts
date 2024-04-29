"use server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function getReservation(){
  
    const token = cookies().get("auth_cookie")
  
    if(!token) {
      return NextResponse.redirect(new URL("/"))
    }
  
    const rs = await fetch(`${process.env.WEBSITE_DOMAIN! as string}/api/reservations`,{
      headers:{
          token:token.value
      },
      next: { revalidate: 10 } 
  } )
  
    if(!rs.ok){
      throw new Error("Failded to fetch data")
    }
    return rs.json()
  }