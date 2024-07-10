import { useState } from "react";
import BikeCard from "./BikeCard"
import { DialogComponent } from "../BikeBooking/Dialog";

export default function BikesList(props:any){
    const [selectedBike, setSelectedBike] = useState<any>([])
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const openDialog = () => {
      setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
      setIsDialogOpen(false);
    };

    return(

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {props.bikesList.map((bike:any,index:number)=>(
                <div key={bike._id} onClick={()=>{
                    setSelectedBike(bike);
                    openDialog();
                }}>
                    <BikeCard bike={bike}/>
                </div>
                
            ))}
                <DialogComponent dot={props.dot} dod={props.dod} put={props.put} pud={props.pud} location={props.location} bike={selectedBike} isOpen={isDialogOpen} onClose={closeDialog} />
        </div>
            );
}
