"use client"
import formatPrice from "@/app/utils/priceStyle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TourCard(props:any){
    const [tour,setTour] = useState(props.tour)

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
    
    return(
      <Link href={`/tours/${tour._id}`}>
        <div className="group bg-white p-4 sm:p-6 rounded-lg m-2 sm:m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-transparent ">
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
          <h1 className="text-xl font-semibold line-clamp-1 mb-0">
            {tour.title}
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            By {tour.operator}
          </p>
          <p className="line-clamp-2 text-sm text-gray-700 mb-4">
            {truncateText(tour.description, 100)}
          </p>
          <p className="flex items-baseline text-2xl font-bold mb-4">
            <span className="text-sm font-semibold"></span>
            {formatPrice(tour.price)}
            <span className="text-xs font-medium ml-1">/P</span>
          </p>
        </div>
    </Link>
    )
} 
export default TourCard;