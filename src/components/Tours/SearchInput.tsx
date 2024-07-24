"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";


const SearchInput = ()=>{
    const search = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string | null>(search ? search.get("q") : "")
    const router = useRouter();

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if(typeof searchQuery !== "string"){
            return
        }
        const encodedSearchQuery = encodeURI(searchQuery);

        router.push(`/search?q=${encodedSearchQuery}`);
    }
    return(
        <form className="flex justify-center w-full md:w-2/5 " onSubmit={onSearch}>
        <input
        value={searchQuery || ""}
        onChange={(e)=> setSearchQuery(e.target.value)}
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-950 bg-zinc-100 focus:bg-zinc-100  rounded-sm focus:outline-none focus:ring-[1px] focus:ring-primary placeholder:text-zinc-400" 
        placeholder="Qué te gustaría hacer en Santa Marta?"/>
        </form>
    )
}

export default SearchInput