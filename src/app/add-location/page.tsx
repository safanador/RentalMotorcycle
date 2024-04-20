"use client"

import Button from "@/components/Form/components/Button";
import Container from "@/components/Form/components/Container";
import FormLabel from "@/components/Form/components/FormLabel";
import FormRow from "@/components/Form/components/FormRow";
import InputText from "@/components/Form/components/InputText";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import React, { useState } from "react";
import { useLoading } from "@/hooks/useLoading";

const AddLocationForm: React.FC = () => {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const authFetch = useAuthFetch();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone:'',
    latitude: '',
    longitude: '', 
    
  })

  const handleChange = (event:any) => {
    console.log("Evento de cambio activado");
    let value = event.target.value;
    console.log("Valor del campo:", value);
    setFormData({...formData, [event.target.id]: value})
    console.log("Estado actualizado:", formData);
  }

  const handleSubmit= async (e: React.SyntheticEvent) => {
        
    e.preventDefault();
    startLoading()

    try {      

      await authFetch({
            endpoint:"/api/add-location",
            redirectRoute: "/add-location",
            formData,
      })    
      finishLoading()
      setFormData({
        name: '',
        address: '',
        telephone:'',
        latitude: '',
        longitude: '',
      })
      

    } catch (error) {
        console.error("Error", error)
      }
       
  }

    return(
        <Container>
        <form className="max-w-md  rounded p-6 mx-auto border-solid border border-black" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold	 text-center text-slate-900 mb-4 ">
          Registro de Locaciones
        </h2>
        <p className="font-normal	text-base	">
          Formulario de registro de locaciones
        </p>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <InputText value={formData.name} id="name" name="name" type="text" onChange={handleChange}  />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="address">Dirección</FormLabel>
            <InputText value={formData.address}   onChange={handleChange} id="address" name="address" type="text" />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="telephone">Telefono</FormLabel>
            <InputText value={formData.telephone} onChange={handleChange} id="telephone" name="telephone" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="latitude">Latitud</FormLabel>
            <InputText value={formData.latitude} onChange={handleChange} id="latitude" name="latitude" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="longitude">Longitud</FormLabel>
            <InputText value={formData.longitude} onChange={handleChange}  id="longitude" name="longitude" type="text" />
          </FormRow>

          <Button 
          buttonText="Añadir Locación" 
          isLoading={isLoading}/>
        </form>

      </Container>);

}
export default AddLocationForm;