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
import { IRentalBike } from "@/app/models/Bike";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function SearchRentalComponent() {
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

  const filterBikeListByCategory = (category:string)=>{
    const filteredList = bikesOrgList.filter((item:IRentalBike)=>item.bikeType===category);
    setBikesList(filteredList)
  }

  const clearFilters = ()=>{
    setBikesList(bikesOrgList)
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
    <section className="flex flex-col md:flex-row p-2 sm:px-4 md:px-2">
        <div className="flex flex-col p-2 mt-4 sm:px-5 md:px-6 md:hidden w-full">  
          <h1 className="font-bold text-xl mb-2">Our location</h1>
          {location?(<MapCaller longitude={Number(location.longitude)} latitude={Number(location.latitude)} address={location.address}/>):(<div className="flex justify-center"><Loader/></div>)}
        </div>
        <div className="hidden p-2 mt-4 sm:px-5 md:px-6 md:block md:w-[30%] z-0">
            <div className="mb-2 ">
             {location?(<MapCaller longitude={Number(location.longitude)} latitude={Number(location.latitude)} address={location.address}/>):(<div className="flex justify-center"><Loader/></div>)}
            </div>
            <div className="rounded-md border p-2 ">
              <div className="flex items-center justify-between">
                <h1>Filter</h1>
                <p onClick={clearFilters} className="cursor-pointer text-blue-500">clean all filters</p>
              </div>
              <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              <div>
                <Select onValueChange={(value:any) => filterBikeListByCategory(value)}>
              <SelectTrigger className="m-auto">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Premium Adventure">Premium adventure</SelectItem>
                  <SelectItem value="Intermedium Adventure">Intermedium adventure</SelectItem>
                  <SelectItem value="Economy Adventure">Economy adventure</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
              </div>
            </div>
        </div>
        <div className="p-2 sm:px-5 md:px-1 md:w-[70%] z-10">
            <BikeFilterOptions orderBikeList={(value:string)=>orderBikeList(value)} bikesList={bikesOrgList}
            setBrand={(value:string)=>filterBikeList(value)} setCategory={(value:string)=>filterBikeListByCategory(value)} clearFilters={clearFilters}/>
            {isLoading? (<SkeletonCard/>) : (<BikesList location={location?.name} dot={dot} dod={dod} put={put} pud={pud}  bikesList={bikesList}/>)}
        </div>
    </section>
  );
}
