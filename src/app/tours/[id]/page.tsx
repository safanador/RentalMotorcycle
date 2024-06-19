import Image from "next/image";
import { notFound } from "next/navigation"
import {cache} from "react"
import { Metadata } from "next";
import Tours from "@/app/models/Tours";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ImageGallery from "@/components/ImageGalery/imageGallery";
import { ReadMore } from "@/components/ReadMore/ReadMore";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { TourBooking } from "@/components/Tours/TourBooking";
import formatPrice from "@/app/utils/priceStyle";


interface ProductPageProps{
    params:{
        id:string,
    }
}

const getProduct = cache(async (id: string) => {
    const product = await Tours.findById(id).exec();
    if(!product) notFound();
    return JSON.parse(JSON.stringify(product.toObject()));} )

export async function generateMetadata(
    {params:{id}} : ProductPageProps
): Promise<Metadata>{
    const product = await getProduct(id);

    return{
        title:product.title + " - Elink",
        description: product.description,
        openGraph:{
            images:[{url:product.imageUrl1}],
        },
    };
}

export default async function ProductPage({params:{id}} : ProductPageProps){
    const product = await getProduct(id);
    return(
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery
                    data={product}/>
                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500">Aventura</span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{product.title}</h2>
                            <span className="mb-0.5 text-gray-500 inline-block text-[14px]">by{" "}{product.operator}</span>
                        </div>
                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className="rounded-full gap-x-2">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5"/>
                            </Button>
                            <span className="text-sm text-gray-500 transition duration-100">56 Ratings</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-bold text-gray800 md:text-2xl">{formatPrice(product.price)}
                                </p>
                               {/* <span className="mb-0.5 text-red-500 line-through">{formatPrice(product.price + 30000) }</span> */}
                            </div>
                        </div>
                       <ReadMore id={product._id} text={product.description}/>
                    </div>
                    <div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>¿Qué está incluido?</AccordionTrigger>
                                <AccordionContent>
                                    {product.included}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>¿Qué esperar?</AccordionTrigger>
                                <AccordionContent>
                                    {product.itinerary}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Salida y regreso</AccordionTrigger>
                                <AccordionContent>
                                    <h3 className="font-semibold">Lugar de inicio: <span className="font-medium">{product.initAddress}</span></h3>
                                    <p>{product.initDirections}</p>
                                    <h3 className="font-semibold">Finalización: <span className="font-medium">Esta actividad finaliza en el punto de encuentro</span></h3>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Accesibilidad</AccordionTrigger>
                                <AccordionContent>
                                    {product.accessibility}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Información adicional</AccordionTrigger>
                                <AccordionContent>
                                    {product.additionalInfo}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>Política de Cancelación</AccordionTrigger>
                                <AccordionContent>
                                    {product.cancelPolicy}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-7">
                                <AccordionTrigger>Preguntas frecuentes</AccordionTrigger>
                                <AccordionContent>
                                    {product.faq}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-8">
                                <AccordionTrigger>Ayuda</AccordionTrigger>
                                <AccordionContent>
                                    {product.help}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <TourBooking data={product}/>
                </div>
            </div>
        </div>
    )
}