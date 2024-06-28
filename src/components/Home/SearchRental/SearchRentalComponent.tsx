"use client"
import BikeFilterOptions from "@/components/Home/BikeFiltersOptions";
import BikesList from "@/components/Home/bikesList";
import { useEffect, useState } from "react";
import { useHomeLoading } from "@/hooks/useHomeLoading";
import SkeletonCard from "@/components/Home/BikeCardSkeleton";
import { useSearchParams } from "next/navigation";
import { ILocationProps } from "@/app/models/Location";
import { Loader } from "@/components/Loader";
import MapComponent from "./MapComponent";
import MapCaller from "./DynamicMap";


export default function Rental() {
  const searchParams = useSearchParams()
  const loc = searchParams.get('loc');
  const pud = searchParams.get('pud');
  const put = searchParams.get('put');
  const dod = searchParams.get('dod');
  const dot = searchParams.get('dot');
  const {finishLoading, isLoading, startLoading} = useHomeLoading();
  const [bikesList,setBikesList] = useState<any>([])
  const [bikesOrgList, setBikesOrgList] = useState<any>([])
  const [location, setLocation] = useState<ILocationProps>();

  // useEffect para informacion de la locacion
  useEffect(() => {
   
      async function fetchLocationById() {
      const fetchedlocation = await fetch(`/api/rental/getLocationById?loc=${loc}`, {
        method: 'GET',
        next: { revalidate: 1800 },
      });
      const data = await fetchedlocation.json();
      setLocation(data.location);

    }
    fetchLocationById();
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  // fin useEffect para informacion de la locacion


  useEffect(()=>{

    const FetchBikeData = async()=>{
      startLoading();
      try {
        const fetchedBikesData = await fetch(`/api/get-bike?loc=${loc}`, {
            method: "GET",
            next: { revalidate: 1800 } 
          })
        const data = await fetchedBikesData.json();
        setBikesList(data.bike);
        setBikesOrgList(data.bike);
      } catch (error) {
        console.error('Error fetching bike data:', error);
      }
      finishLoading();
    }

    FetchBikeData()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (isLoading) {
      console.log("Loading is true");
    } else {
      console.log("Loading is false");
    }
  }, [isLoading]); 

  

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
    <section className="flex p-2 sm:px-4 md:px-2">
        <div className="hidden p-2 mt-4 sm:px-5 md:px-8 md:block md:w-1/5">
            <div className="mb-2 ">
             {location?(<MapCaller longitude={Number(location.longitude)} latitude={Number(location.latitude)}/>):(<div className="flex h-64 items-center justify-center"><Loader/></div>)}
            </div>
            <div className="rounded-md border p-2 ">
              <div className="flex items-center justify-between">
                <h1>Filter</h1>
                <p>clean all filters</p>
              </div>
              <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

              <div>
                <h1>Price per day</h1>
                <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              </div>
              <div>
                <h1>Transmission</h1>
                <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              </div>
              <div>
                <h1>Bike category</h1>
                <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              </div>
            </div>
        </div>
        <div className="p-2 sm:px-5 md:px-8 w-screen">
            <BikeFilterOptions orderBikeList={(value:string)=>orderBikeList(value)} bikesList={bikesOrgList}
            setBrand={(value:string)=>filterBikeList(value)}/>
            {isLoading? (<SkeletonCard/>) : (<BikesList bikesList={bikesList}/>)}
        </div>
    </section>
  );
}
