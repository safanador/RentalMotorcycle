"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import ResCard from '../Reservation/ResCard';
import CorporateSideBar from '../SideBars/CorporateSidebar';

const CorporateRentalBooking: React.FC = () => {
  const search = useSearchParams();
  const [resQuery, setResQuery] = useState<string | null >(search? search.get("res") : "");
  const [isBookingFlowVisible, setBookingFlowVisible] = useState(false);
  const [reservationList,setReservationList] = useState<any>("")
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  console.log(reservationList)
  
useEffect(()=>{
  
    getReservationData();
  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  const handleQuerySubmit = (e: React.FormEvent) => {
    // Lógica para obtener información de la reserva con reservationQuery
    e.preventDefault();
    if(typeof resQuery !== "string"){
        return
    }

    const encodedSearchQuery = encodeURI(resQuery);
    router.push(`/corporate?res=${encodedSearchQuery}`);

    getReservationData();
} 


  async function getReservation(){
    const res = await fetch(`/api/corporate/get-reservation-corporate?res=${encodeURI(resQuery!)}`,{
      next: { revalidate: 10 } 
    } )
  
    if(!res.ok){
      console.error("Failed to fetch data", res.status, res.statusText);

      throw new Error("Failed to fetch data")
    }
    const data = await res.json();
    return data;
  }

  const getReservationData = async()=>{
    //startLoading();

    try {
      const {res} = await getReservation();
      setReservationList(res);
    } catch (error) {
      console.error(error);
    }
    //finishLoading();
  }

  
  const handleBookingClick = () => {
    setBookingFlowVisible(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
      <Head>
        <title>Dashboard de Personal Corporativo</title>
      </Head>
      <CorporateSideBar isSidebarOpen={isSidebarOpen}/>
      {/*
      <div className="hidden md:w-1/5 md:bg-gray-900 md:text-white md:flex md:flex-col ">
        <div className="p-6 flex items-center justify-center border-b border-gray-700">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1 p-6">
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                <span className="ml-2">Renta de Vehículos</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                <span className="ml-2">Reserva de Tours</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                <span className="ml-2">Inventarios</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                <span className="ml-2">Locaciones</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                <span className="ml-2">Informes</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
       */}
      <div className="md:w-4/5 p-2">
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
        <div className="mb-6 flex items-center">
          <input 
            type="text" 
            value={resQuery || ""} 
            onChange={(e)=> setResQuery(e.target.value)} 
            placeholder="Consultar reserva de vehículos" 
            className="border p-2 mr-2 w-1/2"
          />
          <button 
            onClick={handleQuerySubmit} 
            className="bg-blue-500 text-white p-2 mr-2 rounded"
          >
            Consultar
          </button>
          <button 
            onClick={handleBookingClick} 
            className="bg-green-500 text-white p-2 rounded w-44"
          >
            Reservar
          </button>
        </div>

          {reservationList.length > 0 && (
          <div className="mt-4 m-auto p-4 border rounded bg-white shadow-md">
            
            {reservationList.map((res:any, index:number)=>(
          <div key={index} className="mb-3">
            <ResCard res={res}/>
          </div>
        ))}

          </div>
        )}

        {isBookingFlowVisible && (
          <div className="mt-4 p-4 border rounded bg-white shadow-md">
            <h3 className="text-xl mb-4">Flujo de Reserva de Motocicleta</h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Nombre:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fecha:</label>
                <input 
                  type="date" 
                  name="date" 
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Hora:</label>
                <input 
                  type="time" 
                  name="time" 
                  className="border p-2 w-full rounded"
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-500 text-white p-2 rounded"
              >
                Confirmar Reserva
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorporateRentalBooking;
