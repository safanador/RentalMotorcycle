import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BikeCard from "../Home/BikeCard";
import { addDays } from 'date-fns';
import { ILocationProps } from '@/app/models/Location';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import DateRangeComp from './DateRangeComp';
import { Loader } from '../Loader';

  const validationSchema = yup.object().shape({
    locationName: yup
      .string()
      .required('* Seleccione una locación entre las sugerencias'),
    pickUpTime: yup
      .string()
      .required('*La hora de recogida es requerida')
      .test('is-valid-time', '* La hora de recogida debe estar entre 08:00 y 18:00', (value) => {
        const [hour, minute] = value.split(':').map(Number);
        return hour >= 8 && hour <= 18;
      }),
    dropOffTime: yup
      .string()
      .required('* La hora de entrega es requerida')
      .test('is-valid-time', '* La hora de entrega debe estar entre 08:00 y 18:00', (value) => {
        const [hour, minute] = value.split(':').map(Number);
        return hour >= 8 && hour <= 18;
      }),
    phoneNumber: yup
      .string()
      .required('* Debe ser ingresado un número válido de 10 digitos'),
    email: yup
      .string()
      .email('Correo electrónico inválido').required('Correo electrónico es requerido'),
    name: yup
      .string()
      .required('* Debe ser ingresado el nombre completo'),
  });

  const timeOptions = Array.from({ length: 21 }, (_, i) => {
    const hours = String(Math.floor(i / 2)+8).padStart(2, '0');
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
  });


interface DialogComponentProps{
  location: ILocationProps ;
  pud: any;
  put: any;
  dod: any;
  dot: any;
  isOpen:boolean;
  onClose: ()=>void;
  bike:any;
}
export const DialogComponent: React.FC<DialogComponentProps> = ({isOpen, onClose, bike, location, pud, put, dod, dot})=>{

  // variables e instancias para el form
  
  //estado de carga
  const [isLoading, setIsLoading] = useState(true)

  const startLoading = () => { 
        console.log("Starting loading...");
        setIsLoading(true);
        console.log(isLoading); }
      
  const finishLoading = () => { setIsLoading(false) }
  
        //
  const [dataForPayment, setDataForPayment] = useState({})
  const formik = useFormik({
    initialValues: {
      locationName: "",
      pickUpDate: addDays(new Date(pud), 1),
      dropOffDate: addDays(new Date(dod),1),
      pickUpTime: put,
      dropOffTime: dot,
      phoneNumber:'',
      email:'',
      bikeId:'',
      name:'',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      startLoading()
      try {
        console.log("1")
  
        const response = await fetch('/api/rental/rentalPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForPayment),
          mode:'cors'
        });
        console.log("2")
  
        const rentalPaymentApiResponse = await response.json();
  
        if (response.ok){
          if (typeof window !== "undefined"){
          window.location.href = rentalPaymentApiResponse.init_point;
          }
        }else {
          console.error("Error", rentalPaymentApiResponse)
        }
        console.log("3")
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
      finishLoading()
    },
  });
console.log(formik.values)
    function handleDataFromChild (range:any){
        formik.setFieldValue('pickUpDate', range[0].startDate )
        formik.setFieldValue('dropOffDate', range[0].endDate )
    }
    useEffect(()=>{
      setDataForPayment(formik.values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formik.values])

    useEffect(()=>{
      formik.setFieldValue('locationName', location)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])
  
  useEffect(()=>{
    if(bike){
        formik.setFieldValue('bikeId', bike._id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bike])

  //

  return (
    <Dialog  onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
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
            <form id='RentalCheckoutForm' onSubmit={formik.handleSubmit}>
              <div className='flex flex-col w-full mt-2 mb-1'>
                  <Label htmlFor='pickUpLocation' className='text-left mb-1'>Lugar de recogida</Label>
                  <Select name='locationName' value={formik.values.locationName}>
                          <SelectTrigger className="col-span-3 w-full max-w-lg mb-2">
                              <SelectValue  placeholder="Locations" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                  <SelectLabel>Locations</SelectLabel>
                                    <SelectItem  value={formik.values.locationName}>
                                      {formik.values.locationName}
                                    </SelectItem>
                              </SelectGroup>
                          </SelectContent>
                  </Select>
                  {formik.errors.locationName && formik.touched.locationName && <div className="text-red-500 text-sm">{formik.errors.locationName}</div>}
                  <Label className='mb-1'>Fecha recogida - Fecha entrega</Label>
                  <DateRangeComp startDate={formik.values.pickUpDate} endDate={formik.values.dropOffDate} className="col-span-3 w-full max-w-lg mb-2" sendDataToParent={handleDataFromChild}/>
                </div>
                <div className='flex gap-5 mb-2 '>
                  <div className='flex flex-col w-full mb-0'>
                      <Label className='mb-1'>PickUp Time</Label>
                      <select
                        name="pickUpTime"
                        value={formik.values.pickUpTime}
                        onChange={(e)=>formik.handleChange(e)}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded w-full col-span-3"
                      >
                        <option value="">Hora recogida</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {formik.errors.pickUpTime && formik.touched.pickUpTime && <div className="text-red-500 text-sm">{formik.errors.pickUpTime.toString()}</div>}
                  </div>
                  <div className='flex flex-col w-full mb-0'>
                      <Label className='mb-1'>Dropoff Time</Label>
                      <select
                        name="dropOffTime"
                        value={formik.values.dropOffTime}
                        onChange={(e)=>formik.handleChange(e)}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded w-full col-span-3"
                      >
                        <option value="">Hora entrega</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {formik.errors.dropOffTime && formik.touched.dropOffTime && <div className="text-red-500 text-sm">{formik.errors.dropOffTime.toString()}</div>}
                  </div>
              </div>
              <div className='flex flex-col w-full mb-2'>
                  <Label className='text-left mb-1'>Nombre completo</Label>
                  <Input onChange={(e)=>formik.handleChange(e)} name='name' type='text' placeholder='Type here' className='col-span-3 w-full max-w-lg mb-2'/>
                  {formik.errors.name && formik.touched.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                  <Label className='mb-1'>Email</Label>
                  <Input onChange={(e)=>formik.handleChange(e)} name='email' type='email' placeholder='Type here' className='input input-bordered w-full max-w-lg mb-2'/>
                  {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
                  <Label className='mb-1' >Número de telefono</Label>
                  <Input onChange={(e)=>formik.handleChange(e)} name='phoneNumber' type='text' placeholder='Type here' className='input input-bordered w-full max-w-lg'/>
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>}
              </div>
            </form>
            </div>
        </div>
        <DialogFooter>
            <Button type="button" onClick={onClose} className='bg-gray-50' variant="outline">Close</Button>
            <Button form='RentalCheckoutForm' type="submit" className='mb-2 md:mb-0' >{isLoading? "Pay now" : <div className='flex items-center justify-center'><Loader/></div> }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
