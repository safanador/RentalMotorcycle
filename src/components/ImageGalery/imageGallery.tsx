"use client";
import { ITourSchema } from "@/app/models/Tours";
import Image from "next/image"
import { useState } from "react"

interface iAppProps{
    data: any
}

export default function ImageGallery({data}:iAppProps){
    const images:any[] = [];

    if (typeof data === 'object' && data !== null) {
        const { imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6, imageUrl7 } = data;
    
        if (imageUrl1) images.push(imageUrl1);
        if (imageUrl2) images.push(imageUrl2);
        if (imageUrl3) images.push(imageUrl3);
        if (imageUrl4) images.push(imageUrl4);
        if (imageUrl5) images.push(imageUrl5);
        if (imageUrl6) images.push(imageUrl6);
        if (imageUrl7) images.push(imageUrl7);
      }

    const [bigImage, setBigImage] = useState(images[0]);

    const handleSmallImageClick = (image:any) =>{
        setBigImage(image);
    }
    return(
        <div className="grid gap-4 mt-4 ">
            <div className="order-last flex gap-4 ">
                {images.map((image:any,idx:any)=>(
                    <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
                        <Image alt="photo" 
                        src={image}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover object-center cursor-pointer"
                        onClick={()=> handleSmallImageClick(image)}/>
                    </div>
                ))}
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gray-100 ">
                    <Image
                    alt="big photo"
                    src={bigImage}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                    />
                    <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">Sale</span>  
            </div>          
        </div>
    )
}