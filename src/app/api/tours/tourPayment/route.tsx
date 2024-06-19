// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { messages } from '@/app/utils/message';
import { isBefore } from 'date-fns';
import MercadoPagoConfig, { Preference } from "mercadopago";
import { connectMongoDB } from '@/app/libs/mongodb';
import Tours from '@/app/models/Tours';


export interface PaymentData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    promoCode?: string;
    notifications?: boolean;
    pickupInfo: string;
    adt?: string;
    cnn?: string;
    inf?: string;
    id?: string;
    date?: string;
  }

  const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN! as string});


export async function POST(req: NextRequest) {
    const currentDate = new Date();

  try {
    const body = await req.json();
    const dataForPayment: PaymentData = body;
    console.log("1")
    //validar datos recibidos
    console.log(dataForPayment)

    if( !dataForPayment.firstName || !dataForPayment.lastName || !dataForPayment.email || !dataForPayment.phoneNumber || !dataForPayment.pickupInfo || !dataForPayment.date || !dataForPayment.id){

        return NextResponse.json(
            {message:messages.error.needProps},{status:400}
            );
    }
    console.log("2")

    if( isBefore(new Date(dataForPayment.date!), currentDate)){

        return NextResponse.json(
            {message:messages.error.dateIsBefore},{status:400}
            );
    }
    console.log("3")

    // conexion DB para traer información del tour
    await connectMongoDB();
    const tour = await Tours.findById(dataForPayment.id).exec();
    // Validar datos de pago
    console.log(tour)
    console.log("4")

    const preference = await new Preference(client).create({
        body: {
          items: [
            {
              id: "tourPayment",
              title: `${tour.title}, ${dataForPayment.date}`,
              quantity: 1,
              picture_url: tour.imageUrl1,
              unit_price: (Number(dataForPayment.adt)*tour.price)+(Number(dataForPayment.cnn)*tour.price)+(Number(dataForPayment.inf)*tour.price),
              //description:`${dataForPayment.pickUpDate}, to , ${dataForPayment.dropOffDate}`,
              currency_id: "COP"
            },
          ],
          payer:{
            name: dataForPayment.firstName,
            email: dataForPayment.email,
            phone:{
              area_code: "00",
              number: dataForPayment.phoneNumber
            }
          },
          metadata:{
            firstName: dataForPayment.firstName,
            lastName: dataForPayment.lastName,
            email: dataForPayment.email,
            phoneNumber: dataForPayment.phoneNumber,
            promoCode: dataForPayment.promoCode,
            notifications: dataForPayment.notifications,
            pickupInfo: dataForPayment.pickupInfo,
            adt: dataForPayment.adt,
            cnn: dataForPayment.cnn,
            inf: dataForPayment.inf,
            tourId: dataForPayment.id,
            date: dataForPayment.date,
          },
          back_urls: {
            success: `{process.env.WEBSITE_DOMAIN}/success`,
            pending: `{process.env.WEBSITE_DOMAIN}/pending`,
            failure: `{process.env.WEBSITE_DOMAIN}/failure`,
          },
        },
      });
      console.log("5")

    return NextResponse.json({ init_point: preference.sandbox_init_point }, {status:200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ message:messages.error.default, error}), { status: 500 });
  }
}
