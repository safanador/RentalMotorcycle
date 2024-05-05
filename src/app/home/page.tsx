"use client"

import { useEffect, useState } from "react";
import { getReservation } from "../services/getReservation";
import ResCard from "@/components/Reservation/ResCard";

export default function Home() {
  const [reservationList,setReservationList] = useState<any>([])

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
  return (
    <section className="flex m-2">
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
    </div>  
    </section>
  );
}
