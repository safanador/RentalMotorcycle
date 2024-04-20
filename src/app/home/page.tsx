import { NextResponse } from "next/server";
import { dateTransform } from "../utils/dateTransform";
import { cookies } from "next/headers";

async function getData(){
  
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

export default async function Home() {
  const { reservations } = await getData();

  return (
    <main >
      <table  className="text-left border m-[1rem] text-sm font-light">
        <thead className="border-b bg-white font-medium">
          <tr className="border-b text-center">
            <th scope="col" className="px-6 py-4">
              Tabla de Reservas
            </th>
          </tr>

          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              PickUp
            </th>
            <th scope="col" className="px-6 py-4">
              DropOff
            </th>
            <th scope="col" className="px-6 py-4">
              PickUp Time
            </th>
            <th scope="col" className="px-6 py-4">
              Moto
            </th>
            <th scope="col" className="px-6 py-4">
              Pagado
            </th>
            <th scope="col" className="px-6 py-4">
              Creada
            </th>
          </tr>
        </thead>
        <tbody>
        {reservations?.map((rs: any, index: number) =>{
            const isEven = index % 2 === 0

            const bg = isEven 
            ? "bg-white"
            : "bg-neutral-100"

            return(
              <tr
              key={rs._id}
              className={`${bg} border-b font-medium dark:border-neutral-500`}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {dateTransform(rs.pickUpDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {dateTransform(rs.dropOffDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {rs.pickUpTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {rs.bike}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {rs.amount}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {dateTransform(rs.createdAt)}
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    </main>
   

  );
}
