import Rental from "@/components/Home/SearchRental/SearchRentalComponent";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

export default function SearchRentalPage(){
  return(
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Rental/>
    </Suspense>
  )
}