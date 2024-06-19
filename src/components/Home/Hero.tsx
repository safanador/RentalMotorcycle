import Image from "next/image";
import React from "react";

function Hero(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)]">
            <div>
                <h2 className="text-[28px] md:text-[56px] lg:text-[60px] font-bold">
                    Premium Adventure Bike Rental in Your Area
                </h2>
                <h2 className="text-[16px] md:text-[20px] text-gray-500 pr-20 mt-5 ">
                    Book the selected bike effortlessly, Pay for driving only, Book It Now
                </h2>
                <button className="p-2 mt-5 bg-blue-500 hover:bg-blue-600 px-4 rounded-full text-white border-none inline-block transform hover:scale-105 transition duration-500 cursor-pointer">
                    Explore More
                </button>
            </div>
            <div>
                <Image alt="hero picture" src= "https://res.cloudinary.com/djqpy9gf0/image/upload/v1709756187/moto_victory_zontes_t350_radios_negro_2022_foto01_j52soe.png"
                width={400}
                height={500}
                className="w-full object-cover "/>
            </div>
        </div>
    )
}
export default Hero