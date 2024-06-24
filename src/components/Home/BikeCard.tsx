import formatPrice from "@/app/utils/priceStyle";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGasPump } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import { TbHelmet } from "react-icons/tb";

function BikeCard(props:any){
    const [bike,setBike] = useState(props.bike)

    useEffect(()=>{
        if(props.bike){
            setBike(props.bike)
        }
    },[props.bike])
    
    console.log("objeto moto en BikeCar",bike);
    return(
        <div  className="group bg-gray-50 p-1 sm:p-3 rounded-3xl m-1 sm:m-2 hover:bg-white cursor-pointer duration-50 hover:border hover:border-primary">
                        <h2 className="text-[20px] font-medium line-clamp-1">
                          {bike.name}
                        </h2>
                        <p className="flex mt-6 text-[20px] font-extrabold">
                            <span className=" self-start text-[12px] font-semibold"></span>{formatPrice(bike.price)} <span className="self-end text-[12px] font-medium">/day</span>
                        </p>
                        <div className="relative w-full h-40 my-3">
                            <Image alt="bike image" src={bike.imageUrl} fill priority className=" object-contain"/>
                        </div>
                        <div className="flex justify-around group-hover:hidden">
                            <div className="text-center text-gray-500">
                                <PiSteeringWheelFill className="w-full text-[22px] mb-2"/>
                                <h2 className="line-clamp-5 text-[14px] font-light">Mecanic</h2>
                            </div>
                            <div className="text-center text-gray-500">
                                <TbHelmet className="w-full text-[22px] mb-2"/>
                                <h2 className="line-clamp-5 text-[14px] font-light">Safety</h2>
                            </div>
                            <div className="text-center text-gray-500">
                                <FaGasPump className="w-full text-[22px] mb-2"/>
                                <h2 className="line-clamp-5 text-[14px] font-light">120KPG</h2>
                            </div>
                        </div>
                        
                         <button className="hidden group-hover:flex bg-gradient-to-r from-blue-400 to-blue-700 p-2 rounded-lg text-white w-full px-5 justify-between">
                            Rent Now<span className="bg-blue-400 p-1 rounded-md"><ArrowRightIcon/>
                            </span>
                        </button>
                        
                    </div>

    )
} 
export default BikeCard;