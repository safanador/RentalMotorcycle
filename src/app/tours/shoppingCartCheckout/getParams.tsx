// hooks/useFetchSearchParams.ts
import { useSearchParams } from 'next/navigation';

const useFetchSearchParams = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const adt = searchParams.get('adt');
  const cnn = searchParams.get('cnn');
  const inf = searchParams.get('inf');
  const date = searchParams.get('date');

  return { id, adt, cnn, inf, date };
};

export default useFetchSearchParams;
