import { getLocation } from '@/app/services'
import React, { useEffect, useState } from 'react'
import DateRangeComp from './DateRangeComp';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function Form({bike, sendDataToParent}:any) {
    const [location,setLocation] = useState<any>([]);
    const [formData,setFormData] = useState({
        locationName:'',
        pickUpDate:'',
        dropOffDate:'',
        pickUpTime:'',
        dropOffTime:'',
        phoneNumber:'',
        email:'',
        bikeId:'',
        name:'',
    })

    function handleClick() {
        sendDataToParent(formData);
      }
      handleClick();

    function handleDataFromChild (range:any){
        setFormData({...formData, pickUpDate: range[0].startDate, dropOffDate: range[0].endDate});
    }

    const today:any = new Date();
  useEffect(()=>{
    getLocationData()
    
  },[])
  
  useEffect(()=>{
    if(bike){
        setFormData({...formData, bikeId: bike._id});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bike])

  const getLocationData = async()=>{
    const {locations} = await getLocation();
    setLocation(locations) 
    console.log(locations)
  }

  const handleChange = (event:any)=>{
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  return (
    <div>
        <div className='flex flex-col w-full mt-2 mb-2'>
            <Label htmlFor='pickUpLocation' className='text-left mb-2'>PickUp Location</Label>
            <Select onValueChange={(value) => setFormData({...formData, locationName: value})} >
                    <SelectTrigger className="col-span-3 w-full max-w-lg mb-2"> {/* w-[120px] */}
                        <SelectValue  placeholder="Locations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Locations</SelectLabel>
                            {location?.map((loc:any,index:number)=>(
                            <SelectItem value={loc.name} key={loc._id}>
                                {loc.address}
                            </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
            </Select>
        </div>
        <div className='flex gap-5 mb-2 '>
            <div className='flex flex-col w-full mb-0'>
                <Label>PickUp DropOff</Label>
                <DateRangeComp sendDataToParent={handleDataFromChild}/>
            </div>
            <div className='flex flex-col w-full mb-0'>
                <Label>PickUp Time</Label>
                <Input type="time" placeholder='Type here' name='pickUpTime' onChange={handleChange} className='col-span-3' />
            </div>
        </div>
        <div className='flex flex-col w-full mb-2'>
            <Label className='text-left'>Name</Label>
            <Input onChange={handleChange} name='name' type='text' placeholder='Type here' className='col-span-3 w-full max-w-lg mb-2'/>
            <Label >Email</Label>
            <Input onChange={handleChange} name='email' type='email' placeholder='Type here' className='input input-bordered w-full max-w-lg mb-2'/>
            <Label >Phone Number</Label>
            <Input onChange={handleChange} name='phoneNumber' type='text' placeholder='Type here' className='input input-bordered w-full max-w-lg'/>
        </div>
    </div>
  )
}

export default Form