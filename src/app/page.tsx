"use client"
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import BikeFilterOptions from "@/components/Home/BikeFiltersOptions";
import BikesList from "@/components/Home/bikesList";
import { useEffect, useState } from "react";
//import { getData } from "./services";
import { useHomeLoading } from "@/hooks/useHomeLoading";
import SkeletonCard from "@/components/Home/BikeCardSkeleton";


export default function Home() {
  {/*
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
 */}
  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero/>
      {/*<SearchInput/> */}
      {/*
      <BikeFilterOptions orderBikeList={(value:string)=>orderBikeList(value)} bikesList={bikesOrgList}
      setBrand={(value:string)=>filterBikeList(value)}/>
      {isLoading? (<SkeletonCard/>) : (<BikesList bikesList={bikesList}/>)}
       */}
    </div>
  );
}
