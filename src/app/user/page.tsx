"use client"
import { useEffect, useState } from "react";
import { getReservation } from "../services/getReservation";
import ResCard from "@/components/Reservation/ResCard";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai"; // Import icons for open/close button
import UserSideBar from "@/components/SideBars/UserSideBar";


export default function Home() {
  const [reservationList,setReservationList] = useState<any>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      <section className="flex min-h-[calc(100vh-64px)]  bg-gray-100">
        <UserSideBar isSidebarOpen={isSidebarOpen} />
        <div className="grid grid-cols-1 m-auto">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-4 focus:outline-none"
            >
              {isSidebarOpen ? <AiOutlineClose size={24} /> : <FaArrowRightFromBracket size={24} />}
            </button>
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
                  onClick={closeSidebar}
                />
              )}
          <div className="flex justify-center items-center mt-2">
            <p className="">A list of your recent reservations</p>
          </div>
          {reservationList.map((res:any, index:number)=>(
            <div key={index} className="mb-3">
              <ResCard res={res}/>
            </div>
          ))}
        </div>
      </section>
  );
}
