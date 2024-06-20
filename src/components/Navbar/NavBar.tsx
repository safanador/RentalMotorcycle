"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
import { Button } from "../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DeleteCookie } from "@/app/services/deleteCookies";
import { Menu } from "lucide-react";
import SearchInput from "./SearchInput";

const links = [
    {name:"Home", href:"/"},
    {name:"Tours", href:"/tours"},
    {name:"Cuenta", href:"/user"},
    {name:"Corporativo", href:"/corporate"},
    
]; 

function NavBar(){
    const pathname = usePathname()
    const router = useRouter();
    const handleLogout = ()=>{
        DeleteCookie()
        router.push("/login")
      }

    return (
        <header className="border-b "> {/*sticky top-0 */}
        <div className="flex items-center justify-between px-5 p-2 shadow-sm border-b-[1px] h-[63px] ">
            <Link href="/">
            <h1 className="text-2xl md:text-4xl font-bold">E<span className="text-primary">LINK</span></h1>
            </Link>
            <Suspense>
                <SearchInput/>
            </Suspense>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button  className="outline-none bg-transparent text-gray-800 hover:bg-transparent hover:text-gray-800 sm:hidden">
                            <Menu/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            {links.map((link, idx)=>(
                                <div key={idx}>
                                    {pathname === link.href ? (
                                    <DropdownMenuItem>
                                        <Link className="text-xs font-semibold text-primary" href={link.href}>
                                            {link.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ):(
                                    <DropdownMenuItem>
                                        <Link href={link.href} className="text-xs font-semibold transition duration-100 hover:text-primary">
                                            {link.name}
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                            </div>   
                            ))}
                            </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </nav>
                {/* 
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button  className="outline-none bg-transparent text-gray-800 hover:bg-transparent hover:text-gray-800">
                            <div className="flex items-center justify-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                */}
            </div>
        </div>
        </header>
    )
}
export default NavBar;