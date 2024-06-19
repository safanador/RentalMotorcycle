//this page fetch the api and returns tours that meet the search criteria
//then it is rendered

//import { useRouter, useSearchParams } from "next/navigation";
//import Spinner from "./Spinner"; SPINNER COMPONENT
//import ProductCard from "@/components/ProductCard"
//import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import { connectMongoDB } from "../libs/mongodb"
import Tours from "../models/Tours"
import TourCard from "@/components/Tours/TourCard"

interface SearchPageProps{
    searchParams:{q: string}
}

export function generateMetadata({searchParams:{q}}:SearchPageProps): Metadata{
    return{
        title: `Search:${q}`,      
}
}

export default async function SearchPage({searchParams:{q}}:SearchPageProps){
  await connectMongoDB()
  const tours = await Tours.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  }).limit(5)
  
  console.log(tours);
  
    if(tours.length === 0){
        return <div className="text-center">No experiences found</div>
    }
    return(
      <section className="m-2">
        <span className="text-xl">
          Showing results for:{" "}
          <span className="font-semibold">{q}</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tours.map((tour:any)=>(
              <TourCard tour={tour} key={tour.id}/> 
            ))}
        </div>
      </section>
        
    )
}