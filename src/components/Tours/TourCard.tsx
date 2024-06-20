"use client"
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGasPump } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import { TbHelmet } from "react-icons/tb";

function TourCard(props:any){
    const [tour,setTour] = useState(props.tour)
    const router = useRouter();

    useEffect(()=>{
        if(props.tour){
            setTour(props.tour)
        }
    },[props.tour])

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.substring(0, maxLength) + '...';
      };
    
    //console.log("objeto moto en TourCard",tour);
    return(
      <button onClick={()=>{router.push(`/tours/${tour._id}`)}}>
        <div className="group bg-white p-4 sm:p-6 rounded-lg m-2 sm:m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-transparent hover:border-primary">
      <div className="relative w-full h-0 pb-56 mb-4 overflow-hidden rounded-lg">
      <Image
          alt="tour image"
          layout="fill"
          objectFit="cover"
          src={tour.imageUrl1}
          priority
          className="rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold line-clamp-1 mb-0">
        {tour.title}
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        by {tour.operator}
      </p>
      <p className="line-clamp-2 text-sm text-gray-700 mb-4">
        {truncateText(tour.description, 100)}
      </p>
      <p className="flex items-baseline text-2xl font-bold mb-4">
        <span className="text-sm font-semibold">$</span>
        {tour.price}
        <span className="text-xs font-medium ml-1">/P</span>
      </p>
      {/*
      <div className="hidden group-hover:block text-sm text-gray-600 mb-4">
        <h3 className="font-semibold">Included:</h3>
        <p className="line-clamp-2">{truncateText(tour.included, 50)}</p>
      </div>
      <div className="hidden group-hover:block text-sm text-gray-600 mb-4">
        <h3 className="font-semibold">Cancellation Policy:</h3>
        <p className="line-clamp-1">{truncateText(tour.cancelPolicy, 50)}</p>
      </div>
       
      <button className="hidden group-hover:flex bg-gradient-to-r from-blue-500 to-blue-700 p-3 rounded-lg text-white w-full justify-between items-center transition-transform transform hover:scale-105">
        Book Now
        <span className="bg-blue-600 p-2 rounded-full">
          <ArrowRightIcon />
        </span>
      </button>   */}
    </div>
    </button>
    )
} 
export default TourCard;