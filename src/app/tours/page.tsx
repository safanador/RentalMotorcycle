'use client';

import { useEffect, useState } from 'react';
import PaginationBar from '@/components/Pagination/PaginationBar';
import TourCard from '@/components/Tours/TourCard';

interface HomeProps {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page = '1' } }: HomeProps) {
  const [tours, setTours] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  useEffect(() => {
    async function fetchTours() {
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
    }

    fetchTours();
  }, [page]);

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <TourCard tour={tour} key={tour._id} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
