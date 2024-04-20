import { MapPin } from "lucide-react";
import React from "react";

function SearchInput(){
    return(
        <div className="flex flex-col items-center mt-5">
            <h2 className="text-gray-400 text-center text-[20px] mb-3">Lets Search what you need</h2>
            
                <div className="flex  bg-gray-100 p-2 px-5 rounded-full">
                    <div className="flex items-center">
                     <MapPin color="black" size={15}/>
                     <input type="text" placeholder="Location" className=" p-2 outline-none bg-transparent border-none"/>
                    </div>
                    <div>
                        <input className="p-2 outline-none 	bg-transparent text-gray-400 border-0" type="date"/>
                    </div>
                </div>
            
        </div>
    );
}
export default SearchInput