import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import BikeCard from "../Home/BikeCard";
import Form from "./Form";
import { useState } from "react";
import { payment } from "./payment";

interface DialogComponentProps{
  isOpen:boolean;
  onClose: ()=>void;
  bike:any;
}
export const DialogComponent: React.FC<DialogComponentProps> = ({isOpen, onClose, bike})=>{

  const [dataForPayment, setDataForPayment] = useState({})
  console.log(dataForPayment)
  
  function handleDataFromChild(formData:any) {
    setDataForPayment(formData);
  }

  const handleSubmit=async(e:React.SyntheticEvent)=>{
    console.log(dataForPayment)
    try {
        /*await authFetch({
            endpoint:"/api/pre-booking",
            formData,
      });*/
      payment(dataForPayment,bike);
      
    } catch (error) {
        console.error("Error", error)
    }
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[850px] lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>
            <div className='border-b-[1px] pb-2'>
              <h3 className='text-[30px] font-light text-gray-400'>Rent Now!</h3>
            </div>
          </DialogTitle>
          <DialogDescription>
            Fill out the following form...
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <BikeCard bike={bike}/>
            </div>
            <div>
                <Form bike={bike} sendDataToParent={handleDataFromChild}/>
            </div>
        </div>
        <DialogFooter>
            <Button type="button" onClick={onClose} variant="outline">Close</Button>
            <Button type="button" onClick={handleSubmit}>Pay Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
