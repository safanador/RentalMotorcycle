'use client';

import { Suspense, useEffect, useState } from 'react';
import PaginationBar from '@/components/Pagination/PaginationBar';
import TourCard from '@/components/Tours/TourCard';
import SearchInput from '@/components/Tours/SearchInput';
import { Skeleton } from '@/components/ui/skeleton';

interface HomeProps {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page = '1' } }: HomeProps) {
  const [tours, setTours] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    async function fetchTours() {
      setLoading(true); // Cambia el estado a cargando
      try {
        const res = await fetch('/api/tours/getAllTours', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page }),
          next: { revalidate: 1800 },
        });

        const data = await res.json();
        setTours(data.tours);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }

    fetchTours();
  }, [page]);

  return (
    <div className="flex flex-col items-center">
        <Suspense>
          <div className='w-full mt-4 p-2'>
            <SearchInput />
          </div>
        </Suspense>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {loading && !tours.length ? (
          // Mostrar Skeleton mientras se cargan los datos
          Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-[400px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : (
          // Mostrar las tarjetas de tours cuando los datos están cargados
          tours.map((tour) => <TourCard tour={tour} key={tour._id} />)
        )}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
