"use client"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns";
import { es } from 'date-fns/locale'; // Import the Spanish locale
import { CalendarCheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BsFillPeopleFill } from "react-icons/bs";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ITourSchema } from "@/app/models/Tours";
import { useRouter, useSearchParams } from "next/navigation";

interface tourBookingProps{
    data: ITourSchema
}


export const TourBooking = ({data}:tourBookingProps)=>{
    
// Reservation State Params
    const search = useSearchParams();
    const router = useRouter();
    const tomorrow = addDays(new Date(), 1)
    const [date, setDate] = useState<Date | undefined>(tomorrow) 

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

    const encodedSearchDateQuery = encodeURI(format(date!, "yyyy-MM-dd").toString());
    const encodedSearchIdQuery = encodeURI(data._id!.toString());
    const encodedSearchAdtQuery = encodeURI(countAdult.toString());
    const encodedSearchCnnQuery = encodeURI(countChildren.toString());
    const encodedSearchInfQuery = encodeURI(countBabies.toString());


    router.push(`/tours/shoppingCartCheckout?id=${encodedSearchIdQuery}&date=${encodedSearchDateQuery}&adt=${encodedSearchAdtQuery}&cnn=${encodedSearchCnnQuery}&inf=${encodedSearchInfQuery}`); 
    }
// End Reservation State Params
  const [countAdult, setCountAdult]= useState(2)
  const [countChildren, setCountChildren]= useState(0)
  const [countBabies, setCountBabies]= useState(0)

  const handleIncrementChildren = ()=>{
    setCountChildren(countChildren + 1 )
  }
  const handleDecrementChildren = ()=>{
    setCountChildren(countChildren - 1  )
  }
  const handleIncrementAdult = ()=>{
    setCountAdult(countAdult + 1)
  }
  const handleDecrementAdult = ()=>{
    setCountAdult(countAdult - 1 )
  }
  const handleIncrementBabies = ()=>{
    setCountBabies(countBabies + 1)
  }
  const handleDecrementBabies = ()=>{
    setCountBabies(countBabies - 1 )
  }

    return(
        <div className="h-max m-4 p-4 md:sticky md:top-4	 hidden md:block  md:border md:border-slate-300 md:rounded-2xl">
            <h1 className=" md:font-semibold text-xs sm:text-sm md:text-xl mb-3">Reserva tu lugar</h1>
            <div className="grid grid-cols-2 mb-3">
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                <CalendarCheckIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", {locale:es}) : <span>Selecciona un día</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            locale={es}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline"><BsFillPeopleFill/></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold leading-none">Integrantes</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div>
                                            <Label htmlFor="adults" className="mr-2">Adultos</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    18+ años
                                                </p>
                                        </div>
                                        <div className="grid grid-cols-3 justify-center">
                                            <button onClick={handleDecrementAdult} className="justify-center justify-self-center"><CiCircleMinus size={"2.5rem"}/></button>
                                            <span className="grid place-items-center">{countAdult}</span>
                                            <button onClick={handleIncrementAdult} className="justify-center justify-self-center"><CiCirclePlus size={"2.5rem"}/></button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div>
                                            <Label htmlFor="children" className="mr-2">Niños</Label>
                                            <p className="text-sm text-muted-foreground">
                                                4 a 17 años
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-3 justify-center">
                                            <button onClick={handleDecrementChildren} className="justify-center justify-self-center"><CiCircleMinus size={"2.5rem"}/></button>
                                            <span className="grid place-items-center">{countChildren}</span>
                                            <button onClick={handleIncrementChildren} className="justify-center justify-self-center"><CiCirclePlus size={"2.5rem"}/></button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="babies" className="mr-2">Bebés</Label>
                                        <div className="grid grid-cols-3 justify-center">
                                            <button onClick={handleDecrementBabies} className="justify-center justify-self-center"><CiCircleMinus size={"2.5rem"}/></button>
                                            <span className="grid place-items-center">{countBabies}</span>
                                            <button onClick={handleIncrementBabies} className="justify-center justify-self-center"><CiCirclePlus size={"2.5rem"}/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium mb-3">
                Hay una opción para el {date ? format(date, "PPP", {locale:es}) : <span>Selecciona un día</span>}
            </p>
            <div className="flex flex-col justify-center border-2 border-black rounded-2xl hover:cursor-pointer p-4 gap-3">
                <h1 className=" md:font-semibold ">{data.title}</h1>
                <div className="border p-1 border-black rounded-sm ">
                    <h2 className="text-[12px] font-semibold ">ELEGIBLE PARA EL PROGRAMA “RESERVA AHORA, PAGA DESPUÉS”</h2> 
                </div>
                <span className="text-sm text-gray-900 font-medium">Recogida incluida</span>
                <div>
                    {countAdult>0?(
                        <p className="text-muted-foreground">{countAdult}{countAdult>1? " Adultos": " Adulto"} x ${(Number(data.price))*countAdult}</p>
                    ):""}
                    {countChildren>0 ?(
                        <p className="text-muted-foreground">{countChildren}{countChildren>1? " Niños": " Niño"} x ${(Number(data.price))*countChildren}</p>
                    ):""}
                    {countBabies>0 ?(
                        <p className="text-muted-foreground">{countBabies}{countBabies>1? " Bebés": " Bebé"} x ${(Number(data.price))*countBabies}</p>
                    ):""}
                    <p className="mt-2 font-semibold">Total: ${(countAdult * Number(data.price)) + (countChildren * Number(data.price)) + (countBabies * Number(data.price))}</p>
                </div>
                <div className="border p-1 text-center border-black rounded-2xl w-24">6:50 a.m.</div>
            </div>
            <Button className="w-full mt-4 rounded-3xl text-[16px]" onClick={onSearch}>
                Reserva ahora
            </Button>
            <div className="flex mt-3 justify-center"><span className="mr-2">{<MdOutlinePublishedWithChanges size={18}/>
            }</span> <p> ¿No estás seguro? Puedes cancelar esta reservación con hasta 24 horas de anticipación para obtener un reembolso completo.</p></div>
        </div>

    );
}