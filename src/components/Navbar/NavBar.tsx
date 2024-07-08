"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { PiMotorcycleBold } from "react-icons/pi";
import { FaPersonHiking } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BsInfoCircle } from "react-icons/bs";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { BiCookie } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LiaFileContractSolid } from "react-icons/lia";
import { GoLaw } from "react-icons/go";




import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import SearchInput from "./SearchInput";

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
                    <nav className="hidden gap-12 lg:flex lg:items-center 2xl:ml-16">
                    {links.map((link, idx)=>(
                    <div key={idx}>
                        {pathname === link.href ? (
                            <Link className="text-lg font-semibold text-primary" href={link.href}>
                                {link.name}
                            </Link>
                        ):(
                            <Link href={link.href} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary">
                                {link.name}
                            </Link>
                        )}
                    </div>   
                    ))}
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
                                    <Link className="flex border p-3 border-white rounded-full items-center justify-center bg-blue-800 " href={link.href}>
                                        {link.icon}
                                        <p className="text-white text-sm font-medium ml-2">{link.name}</p>
                                    </Link>
                                ):(
                                    <Link className="flex p-3  items-center justify-center hover:rounded-full hover:bg-blue-800 " href={link.href}>
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