// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { messages } from '@/app/utils/message';
import MercadoPagoConfig, { Preference } from "mercadopago";
import { connectMongoDB } from '@/app/libs/mongodb';
import Tours from '@/app/models/Tours';
import Bookings from '@/app/models/Reservation';
import RentBikes, { IRentalBike } from '@/app/models/Bike';
import { differenceInDays } from 'date-fns';


export interface PaymentData {
  locationName: string,
  pickUpDate: string,
  dropOffDate: string,
  pickUpTime: string,
  dropOffTime: string,
  phoneNumber: string,
  email: string,
  bikeId: string,
  name: string,
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

    if( !dataForPayment.locationName || !dataForPayment.pickUpDate || !dataForPayment.dropOffDate || !dataForPayment.pickUpTime || !dataForPayment.dropOffTime || !dataForPayment.phoneNumber || !dataForPayment.email || !dataForPayment.bikeId || !dataForPayment.name){

        return NextResponse.json(
            {message:messages.error.needProps},{status:400}
            );
    }
    console.log("2")

    console.log("3")

    // conexion DB para traer información del tour
    await connectMongoDB();
    const rental: IRentalBike = await RentBikes.findById(dataForPayment.bikeId).exec();
    // Validar datos de pago
    console.log(rental)
    console.log("4")

    const pickUpDate = new Date(dataForPayment.pickUpDate);
    const dropOffDate = new Date(dataForPayment.dropOffDate);

    const diffInDays = differenceInDays(dropOffDate, pickUpDate);
    console.log(diffInDays);
    console.log(dataForPayment)

    const preference = await new Preference(client).create({
        body: {
          items: [
            {
              id: "tourPayment",
              title: `${rental.name}, Días: ${diffInDays}`,
              quantity: 1,
              picture_url: rental.imageUrl,
              unit_price: Number(rental.price*diffInDays),
              //description:`${dataForPayment.pickUpDate}, to , ${dataForPayment.dropOffDate}`,
              currency_id: "COP"
            },
          ],
          payer:{
            name: dataForPayment.name,
            email: dataForPayment.email,
            phone:{
              area_code: "00",
              number: dataForPayment.phoneNumber
            }
          },
          metadata:{
            name: dataForPayment.name,
            email: dataForPayment.email,
            phone: dataForPayment.phoneNumber,
            location: dataForPayment.locationName,
            locationAddress: dataForPayment.locationName,
            bike: rental.name,
            pickUpDate: dataForPayment.pickUpDate,
            dropOffDate: dataForPayment.dropOffDate,
            pickUpTime: dataForPayment.pickUpTime,
            typeOfReservation: "Rent Only",
            party: 2,
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
