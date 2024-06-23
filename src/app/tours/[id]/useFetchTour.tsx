"use client"
import { useState, useEffect } from 'react';

interface ITourProps{
   tour:{
    _id:  string;
    title: string;
    operator: string;
    description:string;
    included:string;
    notIncluded:string;
    itinerary:string;
    initAddress:string;
    initDirections:string;
    finalAddress:string;
    finalDirections:string;
    accessibility:string;
    additionalInfo:string;
    cancelPolicy:string;
    faq:string;
    help:string;
    price:string;
    imageUrl1:string;
    imageUrl2:string;
    imageUrl3:string;
    imageUrl4:string;
    imageUrl5:string;
    imageUrl6:string;
    imageUrl7:string;
   }
}

const useFetchTour = (id: string) => {
    const [tour, setTour] = useState<ITourProps>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await fetch(`/api/tours/getTourById?id=${id}`, {
                    method: 'GET',
                    //headers: {
                     //   'Content-Type': 'application/json',
                   // },
                    //body: JSON.stringify({ id }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setTour(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [id]);

    return { tour, loading, error };
};

export default useFetchTour;
