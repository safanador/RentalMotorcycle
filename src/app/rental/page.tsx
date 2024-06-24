"use client"
import BikeFilterOptions from "@/components/Home/BikeFiltersOptions";
import BikesList from "@/components/Home/bikesList";
import { useEffect, useState } from "react";
import { useHomeLoading } from "@/hooks/useHomeLoading";
import SkeletonCard from "@/components/Home/BikeCardSkeleton";
import { getData } from "../services";


export default function Rental() {
  const {finishLoading, isLoading, startLoading} = useHomeLoading();
  const [bikesList,setBikesList] = useState<any>([])
  const [bikesOrgList, setBikesOrgList] = useState<any>([])

  useEffect(()=>{
    getBikeData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (isLoading) {
      console.log("Loading is true");
    } else {
      console.log("Loading is false");
    }
  }, [isLoading]); 

  const getBikeData = async()=>{
    startLoading();
    const {bike} = await getData();
    setBikesList(bike);
    setBikesOrgList(bike);
    finishLoading();
  }

  const filterBikeList = (brand:string)=>{
    const filterList = bikesOrgList.filter((item:any)=>
    item.brand==brand);

    setBikesList(filterList)
  }
  
  const orderBikeList = (order:any)=>{
    const sortedData = [...bikesOrgList].sort((a,b)=>
    order==-1? a.price - b.price:b.price - a.price);
    setBikesList(sortedData)
  }

  return (
    <section className="flex p-2 sm:px-4 md:px-4">
        <div className="hidden md:block md:w-1/5">
            Hola mundo filtros
        </div>
        <div className="p-2 sm:px-5 md:px-8">
            <BikeFilterOptions orderBikeList={(value:string)=>orderBikeList(value)} bikesList={bikesOrgList}
            setBrand={(value:string)=>filterBikeList(value)}/>
            {isLoading? (<SkeletonCard/>) : (<BikesList bikesList={bikesList}/>)}
        </div>
    </section>
  );
}
