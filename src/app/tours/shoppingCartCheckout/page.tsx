// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Wallet } from 'lucide-react';
import { FaHeadset } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { es } from 'date-fns/locale'; // Import the Spanish locale
import { format } from "date-fns";


interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  promoCode?: string;
  notifications?: boolean;
  pickupInfo: string;
  adt?: string;
  cnn?: string;
  inf?: string;
  id?: string;
  date?: string;
}

const schema = yup.object({
  firstName: yup.string().required('Nombre es requerido'),
  lastName: yup.string().required('Apellido es requerido'),
  email: yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  phoneNumber: yup.string().required('Número de teléfono es requerido'),
  promoCode: yup.string().optional(),
  notifications: yup.boolean().optional(),
  pickupInfo: yup.string().required('Información de recogida es requerida'),
  adt: yup.string().optional(),
  cnn: yup.string().optional(),
  inf: yup.string().optional(),
  id: yup.string().optional(),
  date: yup.string().optional(),


}).required();

const Home: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({resolver: yupResolver(schema)});

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.adt = adt!
    data.cnn = cnn!
    data.inf = inf!
    data.id = id!
    data.date = date!
    console.log("0")

    try {
      console.log("1")

      const response = await fetch('/api/tours/tourPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode:'cors'
      });
      console.log("2")

      const tourPaymentApiResponse = await response.json();

      if (response.ok){
        window.location.href = tourPaymentApiResponse.init_point;
      }else {
        console.error("Error", tourPaymentApiResponse)
      }

      console.log("3")

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
    console.log("4")

    console.log(data);
  };

  //get tour by id start
  const [tourInfo, setTourInfo]= useState<any>("")
  const searchParams = useSearchParams()
  const id = searchParams.get('id');
  const adt = searchParams.get('adt');
  const cnn = searchParams.get('cnn');
  const inf = searchParams.get('inf');
  const date = searchParams.get('date');
  let formattedDate = "Fecha no disponible";
  if (date) {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    formattedDate = format(selectedDate, "PPP", { locale: es });
  }




  //console.log(tourInfo)
  async function getTourById(){
    const tourById = await fetch(`/api/tours/getTourById?id=${id}`,{
      next: { revalidate: 10 } 
    } )
  
    if(!tourById.ok){
      console.error("Failed to fetch data", tourById.status, tourById.statusText);

      throw new Error("Failed to fetch data")
    }
    const data = await tourById.json();
    
    return data;
  }
  

  const getReservationData = async()=>{
    //startLoading();

    try {
      const {tour} = await getTourById();
      setTourInfo(tour);
    } catch (error) {
      console.error(error);
    }
    //finishLoading();
  }
  useEffect(()=>{
    getReservationData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    //get tour by id end


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input type="text" {...register('firstName')} className="mt-1 p-2 w-full border rounded-md" />
              <p className="text-red-600">{errors.firstName?.message}</p>
            </div>
            <div>
              <label className="block text-gray-700">Apellido</label>
              <input type="text" {...register('lastName')} className="mt-1 p-2 w-full border rounded-md" />
              <p className="text-red-600">{errors.lastName?.message}</p>
            </div>
            <div>
              <label className="block text-gray-700">Correo Electrónico</label>
              <input type="email" {...register('email')} className="mt-1 p-2 w-full border rounded-md" />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div>
              <label className="block text-gray-700">Número de Teléfono</label>
              <input type="tel" {...register('phoneNumber')} className="mt-1 p-2 w-full border rounded-md" />
              <p className="text-red-600">{errors.phoneNumber?.message}</p>
            </div>
            <div>
              <label className="block text-gray-700">
                <input type="checkbox" {...register('notifications')} className="mr-2" />
                Autorizar Notificaciones por Mensaje de Texto
              </label>
            </div>
            <div>
              <label className="block text-gray-700">Información de Recogida</label>
              <input type="text" {...register('pickupInfo')} className="mt-1 p-2 w-full border rounded-md" />
              <p className="text-red-600">{errors.pickupInfo?.message}</p>
            </div>
            <div>
              <label className="block text-gray-700">Código Promocional</label>
              <input type="text" {...register('promoCode')} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Check Out</button>
          </form>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Descripción del Tour</h2>
            <div className="flex items-center space-x-4">
              <Image src={tourInfo.imageUrl1} width={96} height={96} alt="Tour Thumbnail" className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h3 className="text-xl font-semibold">{tourInfo.title}</h3>
                <p className="text-gray-700 mt-2 line-clamp-3">{tourInfo.included}</p>
                <span className='text-gray-700'>{formattedDate}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">Adultos: {adt}</p>
              <p className="text-gray-700">Niños: {cnn}</p>
              <p className="text-gray-700">Bebés: {inf}</p>
              <p className="text-lg font-semibold mt-2">Total de la Reserva: {((Number(adt)*tourInfo.price)+(Number(cnn)*tourInfo.price)+(Number(inf)*tourInfo.price)).toLocaleString("es-CO",{
                style:"currency", 
                currency: 'COP',
                maximumFractionDigits: 0})}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">

              <div className='flex gap-3 mb-5'>
                <div>
                    <span><Wallet/></span>
                </div>
                <div>
                  <h4 className="font-semibold text-[16px] md:text-[18px] ">El precio más bajo garantizado</h4>
                  <p className="text-gray-700">¿Lo encontraste más barato? Te reembolsaremos la diferencia</p>
                </div>
              </div>
              
              <div className='flex gap-3 mb-5'>
                <div>
                  <span><IoShieldCheckmarkSharp size={24}/>
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[16px] md:text-[18px] ">Protección de privacidad</h4>
                  <p>Usamos encriptación SSL para mantener tus datos seguros</p>
                </div>
               
              </div>

              <div className='flex gap-3'>
                <div>
                  <span><FaHeadset size={24}/></span>
                </div>
                <div>
                  <h4 className="font-semibold text-[16px] md:text-[18px] ">Asistencia internacional las 24 horas del día, los 7 días de la semana</h4>
                  <p>Obtén las respuestas que necesitas, en el momento en que las necesitas</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
