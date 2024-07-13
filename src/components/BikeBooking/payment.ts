{/*"use server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { redirect } from "next/navigation";
import {differenceInDays} from "date-fns"


const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN! as string});

export async function payment(dataForPayment:any, bike:any) {
  

    const diffInDays = differenceInDays(dataForPayment.dropOffDate, dataForPayment.pickUpDate);
    console.log(diffInDays);
    console.log(dataForPayment)

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "donacion",
            title: `${bike.name} x ${diffInDays} (Días)`,
            quantity: 1,
            picture_url: bike.imageUrl,
            unit_price: Number(bike.price*diffInDays),
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
          locationAddress: dataForPayment.locationAddress,
          bike: bike.name,
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

    redirect(preference.sandbox_init_point!);
  }
     */}