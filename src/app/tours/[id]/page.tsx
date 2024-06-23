"use client"
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ImageGallery from "@/components/ImageGalery/imageGallery";
import { ReadMore } from "@/components/ReadMore/ReadMore";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TourBooking } from "@/components/Tours/TourBooking";
import formatPrice from "@/app/utils/priceStyle";
import useFetchTour from "./useFetchTour";

interface tourPageProps {
    params: {
        id: string,
    }
}

{/* 

export async function GenerateMetadata(
    { params: { id } }: tourPageProps
): Promise<Metadata> {
    const {tour} = useFetchTour(id);

    return {
        title: tour?.tour.title + " - Elink",
        description: tour?.tour.description,
        openGraph: {
            images: [{ url: tour!.tour.imageUrl1 }],
        },
    };
}  
    */} 

export default function TourPage({ params: { id } }: tourPageProps) {
    const { tour, loading, error } = useFetchTour(id);
    console.log(tour?.tour)
    console.log(id);
    //console.log(tour);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!tour?.tour) return notFound();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery data={tour.tour} />
                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500">Aventura</span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{tour.tour.title}</h2>
                            <span className="mb-0.5 text-gray-500 inline-block text-[14px]">by{" "}{tour.tour.operator}</span>
                        </div>
                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className="rounded-full gap-x-2">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5" />
                            </Button>
                            <span className="text-sm text-gray-500 transition duration-100">56 Ratings</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-bold text-gray800 md:text-2xl">{formatPrice(Number(tour.tour.price))}</p>
                                {/* <span className="mb-0.5 text-red-500 line-through">{formatPrice(tour.price + 30000)}</span> */}
                            </div>
                        </div>
                        <ReadMore id={tour.tour._id} text={tour.tour.description} />
                    </div>
                    <div className="order-last md:order-none">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>¿Qué está incluido?</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.included}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>¿Qué esperar?</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.itinerary}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Salida y regreso</AccordionTrigger>
                                <AccordionContent>
                                    <h3 className="font-semibold">Lugar de inicio: <span className="font-medium">{tour.tour.initAddress}</span></h3>
                                    <p>{tour.tour.initDirections}</p>
                                    <h3 className="font-semibold">Finalización: <span className="font-medium">Esta actividad finaliza en el punto de encuentro</span></h3>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Accesibilidad</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.accessibility}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Información adicional</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.additionalInfo}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>Política de Cancelación</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.cancelPolicy}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-7">
                                <AccordionTrigger>Preguntas frecuentes</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.faq}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-8">
                                <AccordionTrigger>Ayuda</AccordionTrigger>
                                <AccordionContent>
                                    {tour.tour.help}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <Suspense>
                        <TourBooking data={tour.tour}  />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
