//this page will fetch the api add-tour with the tour info
//title
//picture
//description
//price
"use client"

import Button from "@/components/Form/components/Button";
import Container from "@/components/Form/components/Container";
import FormLabel from "@/components/Form/components/FormLabel";
import FormRow from "@/components/Form/components/FormRow";
import InputText from "@/components/Form/components/InputText";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLoading } from "@/hooks/useLoading";
import { getLocation } from "../services";
import { Input } from "@/components/ui/input";

const AddTourForm: React.FC = () => {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const authFetch = useAuthFetch();
  const [location,setLocation] = useState<any>([]);
  
  const getLocationData = async()=>{
    const {locations} = await getLocation();
    setLocation(locations) 
    console.log(locations)
  }

  const today:any = new Date();
  useEffect(()=>{
    getLocationData()
  },[])

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '',
    price: '', 
    description: '',
    imageUrl: null,
    bikeType: '',
    odometer: '',
    location:'',
  })

  const handleChange = (event:any) => {
    let value = event.target.value;
    setFormData({...formData, [event.target.id]: value})
  }

  // drag and drop feature
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
        
    const file = new FileReader;

    file.onload = function(){
    setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, []);

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleSubmit= async (e: React.SyntheticEvent) => {
        
    e.preventDefault();
    startLoading()
    if ( typeof acceptedFiles[0] === "undefined") return;
        
    const formDataWithFile = new FormData();

    formDataWithFile.append("file", acceptedFiles[0]);
    formDataWithFile.append("upload_preset", process.env.CLOUDINARY_PRESET_NAME! as string);
    formDataWithFile.append("api_key", process.env.CLOUDINARY_API_KEY! as string);
    console.log(acceptedFiles)

    // drag and drop feature

    try {

      //upload image to cloudinary
      const results = await fetch('https://api.cloudinary.com/v1_1/djqpy9gf0/image/upload', {

        method: 'POST',
        body: formDataWithFile
      }).then(r => r.json());
          
      console.log('results', results.secure_url);
          
      const secureUrl = results.secure_url

      // adding the secure_url to the previous formData

      const requestData = {...formData, imageUrl:secureUrl };
      
      await authFetch({
            endpoint:"/api/add-bike",
            redirectRoute: "/add-bike",
            requestData
      })    
      finishLoading()

    } catch (error) {
        console.error("Error", error)
      }
       
  }

    return(
        <Container>
        <form className="max-w-md  rounded p-6 mx-auto border-solid border border-black" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold	 text-center text-slate-900 mb-4 ">
          Registro de motocicletas
        </h2>
        <p className="font-normal	text-base	">
          Formulario de registro de vehículos
        </p>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputText id="name" name="name" type="text" onChange={handleChange}  />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="brand">Marca</FormLabel>
            <InputText value={formData.brand} onChange={handleChange} id="brand" name="brand" type="text" />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="year">Modelo</FormLabel>
            <InputText onChange={handleChange} id="year" name="year" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="price">Precio de Renta</FormLabel>
            <InputText onChange={handleChange} id="price" name="price" type="number" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <InputText onChange={handleChange}  id="description" name="description" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="bikeType">Categoria</FormLabel>
              <select id="bikeType" name="bikeType" onChange={handleChange} className="select select-bordered w-full max-w-xs">
                <option disabled selected>Categories</option>
                <option value="Economy Adventure">Economy Adventure</option>
                <option value="Intermedium Adventure">Intermedium Adventure</option>
                <option value="Premium Adventure">Premium Adventure</option>
              </select>
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="odometer">Odometro</FormLabel>
            <InputText onChange={handleChange}  id="odometer" name="odometer" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Locacion</FormLabel>
              <select id="location" name="location" onChange={handleChange} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>Locations</option>
                  {location&&location.map((loc:any,index:number)=>(
                    <option value={loc._id} key={loc._id}>
                        {loc.address}
                    </option>
                ))}   
              </select>
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="imageUrl">Image</FormLabel>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input multiple id="imageUrl" type="file" />
              </div>
            {/*<div {...getRootProps()} className="border-dashed border-2 border-gray-600	">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag and drop some files here, or click to select files</p>
                  
              }
            </div> */}
          </FormRow>

          {/*{preview && (
            <p className="mb-5">
              <Image width={100} height={100} src={preview as string} alt="Upload preview" />
            </p>
          )} */}

          <Button 
          buttonText="Añadir Vehiculo" 
          isLoading={isLoading}/>
        </form>

      </Container>);

}
export default AddTourForm;