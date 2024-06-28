"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours}:${minutes}`;
});

const SearchBar: React.FC = () => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const query = {
      location,
      pickupDate: pickupDate?.toISOString().split('T')[0],
      pickupTime,
      dropoffDate: dropoffDate?.toISOString().split('T')[0],
      dropoffTime,
    };

   router.push(`/rental/search?loc=${query.location}&pud=${query.pickupDate}&put=${query.pickupTime}&dod=${query.dropoffDate}&dot=${query.dropoffTime}`); 
  }; 

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 md:mr-4">
        <input
          type="text"
          placeholder="Ubicación de recogida"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
        />
        <DatePicker
          selected={pickupDate}
          onChange={(date) => setPickupDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Fecha de recogida"
          className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
        />
        <select
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
        >
          <option value="">Hora de recogida</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <DatePicker
          selected={dropoffDate}
          onChange={(date) => setDropoffDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Fecha de entrega"
          className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
        />
        <select
          value={dropoffTime}
          onChange={(e) => setDropoffTime(e.target.value)}
          className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
        >
          <option value="">Hora de entrega</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
