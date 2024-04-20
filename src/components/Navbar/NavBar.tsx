"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
    {name:"Home", href:"/"},
    {name:"My Reservations", href:"/home"},
    
]; 

function NavBar(){
    const pathname = usePathname()

    return (
        <header className="mb-8 border-b">
        <div className="flex items-center justify-between px-5 p-2 shadow-sm border-b-[1px] ">
            <Link href="/">
            <h1 className="text-2xl md:text-4xl font-bold">E<span className="text-primary">LINK</span></h1>
            </Link>
            <div className="hidden sm:flex gap-5">
                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
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
            </div>
        </div>
        </header>
    )
}
export default NavBar;