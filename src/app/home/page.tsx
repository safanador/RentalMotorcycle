"use client"
import { NextResponse } from "next/server";
import { dateTransform } from "../utils/dateTransform";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getReservation } from "../services/getReservation";
import { DeleteCookie } from "../services/deleteCookies";
import { useRouter } from "next/navigation";
import ResCard from "@/components/Reservation/ResCard";



export default function Home() {
  const [reservationList,setReservationList] = useState<any>([])
  const router = useRouter();

  useEffect(()=>{
    getReservationData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getReservationData = async()=>{
    //startLoading();
    const {reservations} = await getReservation();
    setReservationList(reservations);

    //finishLoading();
  }
  const handleLogout = ()=>{
    DeleteCookie()
    router.push("/login")
  }
  return (
    <div>
      <Button onClick={handleLogout} className="ml-2">Log Out</Button>
    <div className=" m-auto"> {/*w-[900px] */}
      <div className="flex justify-center items-center mt-2">
        <p className="">A list of your recent reservations</p>
      </div>
      <div className="grid grid-cols-1">
        {reservationList.map((res:any, index:number)=>(
          <div key={index} className="mb-3">
            <ResCard res={res}/>
          </div>
        ))}
      </div>
      {/*
      <Table>
  <TableCaption>A list of your recent reservations.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Locacion</TableHead>
      <TableHead>Motocicleta</TableHead>
      <TableHead>Fecha Pickup</TableHead>
      <TableHead>Fecha Dropoff</TableHead>
      <TableHead>Hora</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {reservationList?.map((rs: any, index: number) =>{
            const isEven = index % 2 === 0

            const bg = isEven 
            ? "bg-white"
            : "bg-neutral-100"

            return(
              <TableRow key={rs._id} className={`${bg}`}>
                <TableCell className="font-medium w-[100px]">
                  {rs.location}
                </TableCell>
                <TableCell>
                  {rs.bike}
                </TableCell>
                <TableCell>
                  {dateTransform(rs.pickUpDate)}
                </TableCell>
                <TableCell >
                  {dateTransform(rs.dropOffDate)}
                  </TableCell>
                <TableCell >
                  {rs.pickUpTime}
                </TableCell>
                <TableCell >
                  {rs.used}
                </TableCell>
                <TableCell className="text-right">
                  ${rs.amount}
                </TableCell>
              </TableRow>
            )
          })
        }
  </TableBody>
</Table>
 */}

      {/*
      <table  className="text-left border m-[1rem] text-sm font-light">
        <thead className="border-b bg-white font-medium">
          <tr className="border-b text-center">
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
       */}
    </div>
    </div>
   
        
  );
}
