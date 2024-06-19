"use client"
import { useLoading } from "@/hooks/useLoading";
import { useDropzone, DropzoneRootProps, DropzoneInputProps, FileRejection, DropEvent } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";
import axios from "axios"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { useHomeLoading } from "@/hooks/useHomeLoading";


export default function Home() {
  const {finishLoading, isLoading, startLoading} = useHomeLoading();

  const [formTour, setFormTour] = useState({
    title: "",
    operator: "",
    description:"",
    included:"",
    notIncluded:"",
    itinerary:"",
    initAddress:"",
    initDirections:"",
    finalAddress:"",
    finalDirections:"",
    accessibility:"",
    additionalInfo:"",
    cancelPolicy:"",
    faq:"",
    help:"",
    price:"",
    imageUrl1:null,
    imageUrl2:null,
    imageUrl3:null,
    imageUrl4:null,
    imageUrl5:null,
    imageUrl6:null,
    imageUrl7:null,
  })
  console.log(formTour);

  const handleChange = (event:any) => {
    let value = event.target.value;
    setFormTour({...formTour, [event.target.id]: value})
  }
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [uploadStatus, setUploadStatus] = useState("");

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    acceptedFiles.forEach((file: File) => {
      setSelectedImages((prevState: File[]) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const onUpload = async () => {
    startLoading();
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });
    //console.log(formData);
    try {
      const response = await axios.post("/api/upload", formData);
      //console.log(response.data);
      //console.log(response.data.imageUrl[0])

      setFormTour({...formTour, imageUrl1:response.data.imageUrl[0], imageUrl2:response.data.imageUrl[1], imageUrl3:response.data.imageUrl[2], imageUrl4:response.data.imageUrl[3],imageUrl5:response.data.imageUrl[4],imageUrl6:response.data.imageUrl[5],imageUrl7:response.data.imageUrl[6],});

      setUploadStatus("upload successful");

      await axios.post("/api/add-tour", formTour);
      finishLoading();
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
};
  return (
    <section className="flex w-auto min-h-[calc(100vh-64px)] items-center	justify-center">
      <form onSubmit={onUpload}>
        <div className="my-3">
          <h1 className=" text-[18px] font-semibold">Registro de Tours</h1>
          <p className="text-[14px] text-gray-700">Complete los campos para agregar un nuevo tour.</p>
        </div>
        <div className="my-3">
          <Label htmlFor="title">Titulo</Label>
          <Input type="text" id="title" onChange={handleChange} placeholder="Titulo del anuncio..."/>
        </div>
        <div className="my-3">
          <Label>Empresa Operadora</Label>
          <Input type="text" id="operator" onChange={handleChange} placeholder="Nombre del operador..."/>
        </div>
        <div className="my-3">
          <Label>Descripción</Label>
          <Textarea id="description" onChange={handleChange} placeholder="Descripcion del anuncio..."/>
        </div>
        <div className="my-3">
          <Label>Qué está incluido?</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • en cada nueva opción</p>
          <Textarea id="included" onChange={handleChange} placeholder="El tour incluye..."/>
        </div>
        <div className="my-3">
          <Label>Qué NO está incluido?</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • en cada nueva opción</p>
          <Textarea id="notIncluded" onChange={handleChange} placeholder="El tour NO incluye..."/>
        </div>
        <div className="my-3">
          <Label>Cuál es el itinerario?</Label>
          <Textarea id="itinerary" onChange={handleChange} placeholder="El itinerario es..."/>
        </div>
        <div className=" border rounded-sm p-2 flex flex-col my-3">
          <Label className="mb-2">Salida y regreso</Label>
          <Label className="my-2">Dirección de inicio</Label>
          <Input type="text" id="initAddress" onChange={handleChange} placeholder="Direccion de inicio..."/>
          <Label className="mt-3 mb-1">Indicaciones</Label>
          <Textarea id="initDirections" onChange={handleChange} placeholder="Breves indicaciones..."/>

          <Label className="my-2">Dirección final</Label>
          <Input type="text" id="finalAddress" onChange={handleChange}  placeholder="Lugar donde finaliza..."/>
          <Label className="mt-3 mb-1">Indicaciones</Label>
          <Textarea id="finalDirections" onChange={handleChange} placeholder="Breves indicaciones..."/>

        </div>
        <div className="my-3">
          <Label>Accesibilidad</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • en cada nueva opción</p>
          <Textarea id="accessibility" onChange={handleChange} placeholder="Opciones de accesibilidad en ansianos, niños, asientos especiales, embarazadas..."/>
        </div>
        <div className="my-3">
          <Label>Información adicional</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • en cada nueva opción</p>
          <Textarea id="additionalInfo" onChange={handleChange} placeholder="Información adicional..."/>
        </div>
        <div className="my-3">
          <Label>Politica de cancelación</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • para listas</p>
          <Textarea id="cancelPolicy" onChange={handleChange}  placeholder="Politica de cancelación..."/>
        </div>
        <div className=" border rounded-sm p-2 flex flex-col my-3">
          {/* FALTA AÑADIR UN BOTON PARA AGREGAR NUEVAS PREGUNTAS */}
          <Label className="mb-2">Preguntas frecuentes</Label>
          <Textarea id="faq" onChange={handleChange} placeholder="Preguntas frecuentes..."/>
        </div>
        <div className="my-3">
          <Label>Ayuda</Label>
          <p className="text-gray-600 text-[14px]">Copia y pega • para opciones</p>
          <Textarea id="help" onChange={handleChange} placeholder="Qué hacer en caso de preguntas o requerir ayuda?..."/>
        </div>
        <div className="my-3">
          <Label>Precio</Label>
          <Input type="text" id="price" onChange={handleChange} placeholder="Precio del tour..."/>
        </div>


      <div className="flex flex-col">
      <div className="bg-slate-100 border-2 border-gray-300 border-dashed
     m-auto justify-center w-full h-8 mb-4"{...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop 7 images here, or click to select 7 images</p>
        )}
      </div>
      <div className="flex ">
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <Image src={`${URL.createObjectURL(image)}`} key={index} alt="upload image" width={100} height={100} />
          ))}
      </div>
      {/* {selectedImages.length > 0 && (
       <div>
          <Button className="w-full my-4" onClick={onUpload}>Upload to Cloudinary</Button>
          <p>{uploadStatus}</p>
        </div>
      )} */} 
      </div>
      <Button className="w-full">Guardar</Button>
    </form>
    </section>
  );
}