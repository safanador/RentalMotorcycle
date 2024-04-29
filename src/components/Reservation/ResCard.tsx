import { ArrowRightIcon, Calendar, CalendarCheck, CalendarCheck2Icon, LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGasPump, FaMotorcycle } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import { TbHelmet, TbLocation, TbLocationPin } from "react-icons/tb";

function ResCard(props: any) {
  const [res, setRes] = useState(props.res);

  useEffect(() => {
    if (props.res) {
      setRes(props.res);
    }
  }, [props.res]);

  const formattedPickUpDate = res.pickUpDate.split("T")[0];
  const pickUpindex = new Date(formattedPickUpDate);
  const pickUpNum = pickUpindex.toLocaleDateString("en-US", {day: "numeric", timeZone: 'UTC'});
  const pickUpMonth = pickUpindex.toLocaleDateString("en-US", {month: "short", timeZone: 'UTC'});
  const pickUpDayOfWeek = pickUpindex.toLocaleDateString("en-US", {weekday: "short", timeZone: 'UTC'});

  const formattedDropOffDate = res.dropOffDate.split("T")[0];
  const dropOffindex = new Date(formattedDropOffDate);
  const dropOffNum = dropOffindex.toLocaleDateString("en-US", {day: "numeric", timeZone: 'UTC'});
  const dropOffMonth = dropOffindex.toLocaleDateString("en-US", {month: "short", timeZone: 'UTC'});
  const dropOffDayOfWeek = dropOffindex.toLocaleDateString("en-US", {weekday: "short", timeZone: 'UTC'});
  
  const formattedCreatedAt = res.createdAt.split("T")[0];
  const createdAtIndex = new Date(formattedCreatedAt);
  const createdNum = createdAtIndex.toLocaleDateString("en-US", {day: "numeric", timeZone: 'UTC'});
  const createdMonth = pickUpindex.toLocaleDateString("en-US", {month: "short", timeZone: 'UTC'});
  const createdYear= pickUpindex.toLocaleDateString("en-US", {year: "numeric", timeZone: 'UTC'});


  //console.log("objeto moto en BikeCar", res);
  return (
    <div className="group bg-gray-50 p-2 sm:p-5 rounded-3xl m-2 sm:m-5 hover:bg-white cursor-pointer duration-50 hover:border hover:border-slate-400 ">
        <div className="m-2">
            <h2 className=" flex justify-start items-center text-[20px] font-medium gap-2 line-clamp-1">
                <MapPin /> Location Details
            </h2>
            <div className="bg-blue-400 rounded-t-md mb-[2px] p-2">
                <p className="text-gray-700">Name</p>
                <span className="text-white text-[15px]">{res.location}</span>
            </div>
            <div className="bg-blue-400 rounded-b-md p-2">
                <p className="text-gray-700">Address</p>
                <span className="text-white">Manzana F Casa Grande
                </span>
            </div>
        </div>
        <div className="m-2">
            <h2 className=" flex justify-start items-center text-[20px] font-medium gap-2 line-clamp-1">
                <CalendarCheck2Icon /> Date Details
            </h2>
            <div className="bg-blue-400 flex rounded-md mb-[2px] divide-x-2 p-2 justify-around ">
                <div className=" flex divide-x">
                    <span className="text-white text-[20px] mr-2 ">{pickUpNum}</span>
                    <div className="flex flex-col px-2">
                        <span className="text-white text-[13px]">{pickUpMonth}</span>
                        <span className="text-white text-[13px]">{pickUpDayOfWeek}</span>
                    </div>
                </div>
                <div className="flex divide-x">
                    <span className="text-white text-[20px] mx-2">{dropOffNum}</span>
                    <div className="flex flex-col px-2">
                        <span className="text-white text-[13px]">{dropOffMonth}</span>
                        <span className="text-white text-[13px]">{dropOffDayOfWeek}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-around">
                <div className="text-[14px]">Onward</div>
                <div className="text-[14px]">Return</div>
            </div>
        </div>

        <div className="m-2">
            <h2 className=" flex justify-start items-center text-[20px] font-medium gap-2 line-clamp-1">
                <FaMotorcycle/> Moto Details
            </h2>
            <div className="bg-blue-400 rounded-md mb-[2px] p-2">
                <p className="text-gray-700">Name</p>
                <span className="text-white">{res.bike}</span>
            </div>
        </div>
        <div className="flex justify-between m-2">
            <p>Created: <span>{createdNum}/</span><span>{createdMonth}/</span><span>{createdYear}</span></p>
            <p>Paid: <span>${res.amount.toLocaleString('es-MX')}</span></p>
        </div>
      {/* <p className="flex mt-6 text-[32px] font-extrabold">
                            <span className=" self-start text-[14px] font-semibold">$</span>{bike.price} <span className="self-end text-[14px] font-medium">/day</span>
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
                        */}
    </div>
  );
}
export default ResCard;
