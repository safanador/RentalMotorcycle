import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function BikeFilterOptions({bikesList, setBrand, orderBikeList}:any){
    
    const [brandList, setBrandList] = useState<any>();
    const BrandSet= new Set()

    useEffect(()=>{
        if(bikesList){
            filterBikeList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[bikesList])

    const filterBikeList= ()=> {
        bikesList.forEach((element:any)=>{
            BrandSet.add(element.brand);
        });
        console.log(BrandSet)
        setBrandList(Array.from(BrandSet))
        console.log(brandList)
    }
    return(
        <div className="mt-10 flex justify-between">
            <div>
                <h2 className="text-[30px] font-bold">
                    Our Catalog
                </h2>
                <p className="text-gray-400">Explore bikes you might like</p>
            </div>
            <div className="flex gap-5">
                <Select onValueChange={(value)=>orderBikeList(value)}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue  placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Brands</SelectLabel>
                            <SelectItem value="-1">
                                Min to Max
                            </SelectItem>
                            <SelectItem value="1">
                                Max to Min
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => setBrand(value)} >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue  placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Brands</SelectLabel>
                            {brandList?.map((brand:string,index:number)=>(<SelectItem value={brand} key={index}>{brand}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
export default BikeFilterOptions;