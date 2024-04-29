import { connectMongoDB } from "@/app/libs/mongodb";
import Bookings, { IBookingsSchema } from "@/app/models/Reservation";
import { EmailTemplate } from "@/components/EmailTemplate";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY! as string)

const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN! as string});

export async function POST(request: NextRequest){
    const body = await request.json().then(data => data as {data: {id: string}});

    const payment = await new Payment(client).get({id: body.data.id})
    //console.log("body:", body)
    console.log("payment", payment);
    
    const bookings = {
        paymentId:payment.id,
        amount:payment.transaction_amount,
        netAmount: payment.transaction_details?.net_received_amount,
        name: payment.metadata.name,
        phone: payment.metadata.phone,
        email: payment.metadata.email,
        location: payment.metadata.location,
        locationAddress: payment.metadata.locationAddress,
        bike: payment.metadata.bike,
        pickUpDate: payment.metadata.pick_up_date,
        dropOffDate: payment.metadata.drop_off_date,
        pickUpTime: payment.metadata.pick_up_time,
        typeOfReservation: payment.metadata.type_of_reservation,
        used: "Not Used",
        party: payment.metadata.party,
    }

   // console.log(reservation);
    const whaLink = process.env.WHATSAPP_API_LINK! as string

   if(payment.status === 'approved'){
        try {
            await connectMongoDB();
            const newReservation: IBookingsSchema = new Bookings(bookings);
            await newReservation.save();
            console.log("Payment approved,Reservation added to de DataBase :", bookings);

        //@ts-ignore
        await resend.emails.send({
            from:"info@sergioafanador.com.co",
            to: bookings.email,
            subject:"Reservation Confirmed",
            react: EmailTemplate({buttonUrl:whaLink, name: bookings.name})
        });
        console.log("confirmation email was sent");

        } catch (error) {
            console.log("Unable to connect DB or to send an email confirmation")
        }
        
    }else{
        console.log("Payment was not approved, try again")
    }

    return Response.json({success:true})
}