"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiMotorcycleBold } from "react-icons/pi";
import { FaPersonHiking } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BiCookie } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LiaFileContractSolid } from "react-icons/lia";
import { GoLaw } from "react-icons/go";
import { FaHeadset } from "react-icons/fa";



import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import SearchInput from "../Tours/SearchInput";

const links = [
    {name:"Tours", href:"/tours"},
    {name:"Alquiler", href:"/rental"},
    {name:"Cuenta", href:"/user"},
    //{name:"Corporativo", href:"/corporate"},
]; 

const linksSecondNav = [
    {name:"Tours", href:"/tours", icon:<FaPersonHiking size={28} color="white"/>},
    {name:"Motos rental", href:"/rental", icon:<PiMotorcycleBold size={28} color="white"/>},
    
    //{name:"Corporativo", href:"/corporate"},
]; 

function NavBar(){
    const pathname = usePathname()
    return (
        <header className="border-b bg-blue-900 "> {/*sticky top-0 */}
            <div className="flex items-center justify-between px-5 p-2  h-[60px] ">
                <Link href="/">
                    <h1 className="text-xl md:text-4xl font-bold text-white">Touring.com</h1>
                </Link>
                {/*
                <Suspense>
                    <SearchInput/>
                </Suspense>
                */}
                <div className="flex items-center gap-5">
                    <nav className="hidden gap-12 md:flex md:items-center 2xl:ml-16">
                        <li className="flex items-center gap-4">
                            <HoverCard>
                                <HoverCardTrigger className="cursor-pointer" href="#">
                                    <div className="flex items-center" >
                                        <FaHeadset color="white" size={24}/>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="p-2">
                                    Contact Customer Service
                                </HoverCardContent>
                            </HoverCard>
                            
                            <Link href="/register">
                                <button className="border rounded-sm text-primary bg-gray-50 px-2 py-1  text-[16px]">Register</button>
                            </Link>
                            <Link href="/login">
                                <button className="border rounded-sm text-primary bg-gray-50 px-2 py-1 text-[16px]">Login</button>
                            </Link>
                            <Link href="#">
                            
                            </Link>

                        </li>
                    </nav>
                    <nav className="flex items-center">
                        <Link href="/login">    
                            <RxAvatar color="white" className="mr-4 md:hidden" size={28} />
                        </Link>
                        
                        <Sheet>
                            <SheetTrigger className="outline-none bg-transparent text-gray-800 hover:bg-transparent hover:text-gray-800 md:hidden"><Menu color="white"/></SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle className="mb-4">Más información</SheetTitle>
                                <SheetDescription>
                                    <Link href="#" className="flex items-center mb-4">
                                        <div className="flex items-center justify-start h-[26px] w-[26px]">
                                            <RxQuestionMarkCircled size={21}/>
                                        </div>
                                        <p>Contact Customer Service</p>
                                    </Link>
                                    <Link  href="#" className="flex items-center mb-4">
                                        <div className="flex items-center justify-start h-[26px] w-[26px]">    
                                            <IoInformationCircleOutline size={23}/>
                                        </div>
                                        <p>About Touring.com</p>
                                    </Link>
                                    <Link href="#" className="flex items-center mb-4">
                                        <div className="flex items-center justify-start h-[26px] w-[26px]">
                                            <BiCookie size={22}/>
                                        </div>
                                        <p>Privacy & cookies</p>
                                    </Link>
                                    <Link href="#" className="flex items-center mb-4">
                                        <div className="flex items-center justify-start h-[26px] w-[26px]">
                                            <LiaFileContractSolid size={22}/>
                                        </div>
                                        <p>Terms & conditions</p>
                                    </Link>
                                    <Link href="#" className="flex items-center mb-4">
                                        <div className="flex items-center justify-start h-[26px] w-[26px]">
                                            <GoLaw size={20} className="mr-2"/>
                                        </div>
                                        <p>Legal</p>
                                    </Link>
                                    
                                </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
            <div className="flex shadow-sm border-b-[1px] h-[60px]">
                <nav className="flex">
                    {linksSecondNav.map((link, idx)=>(
                        <div key={idx}>
                            {pathname === link.href ? (
                                    <Link className="flex border px-4 py-2 border-white rounded-full items-center justify-center bg-blue-800 " href={link.href}>
                                        {link.icon}
                                        <p className="text-white text-sm font-medium ml-2">{link.name}</p>
                                    </Link>
                                ):(
                                    <Link className="flex px-4 py-2  items-center justify-center hover:rounded-full hover:bg-blue-800 " href={link.href}>
                                        {link.icon}
                                        <p className="text-white text-sm font-medium ml-2">{link.name}</p>
                                    </Link>
                                )
                            }
                        </div>   
                    ))}
                </nav>     
            </div>
        </header>
    )
}
export default NavBar;