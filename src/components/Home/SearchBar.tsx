'use client';

import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ILocationProps } from '@/app/models/Location';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours}:${minutes}`;
});

// Debounce para disminuir las llamadas a la API
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const SearchBar: React.FC = () => {
  const [location, setLocation] = useState('');
  const [locationId, setLocationId] = useState<ILocationProps["_id"]>("");
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState('');
  const router = useRouter();
  
  // Sugerencias
  const [suggestions, setSuggestions] = useState<ILocationProps[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(debounce(async (location: string) => {
    if (location && !locationId) {
      const fetchedLocationByName = await fetch(`/api/rental/getLocationByName?name=${location}`, {
        method: 'GET',
        next: { revalidate: 1800 },
      });
      const data = await fetchedLocationByName.json();
      setSuggestions(data.locations);
    } else {
      setSuggestions([]);
    }
  }, 500), [locationId]);

  useEffect(() => {
    fetchSuggestions(location);
  }, [location, fetchSuggestions]);

  const handleSearch = () => {
    const query = {
      locationId,
      pickupDate: pickupDate?.toISOString().split('T')[0],
      pickupTime,
      dropoffDate: dropoffDate?.toISOString().split('T')[0],
      dropoffTime,
    };

    router.push(`/rental/search?loc=${query.locationId}&pud=${query.pickupDate}&put=${query.pickupTime}&dod=${query.dropoffDate}&dot=${query.dropoffTime}`); 
  };

  const handleSuggestionClick = (suggestion: ILocationProps) => {
    setLocation(suggestion.name);
    setLocationId(suggestion._id);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setLocationId('');
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 md:mr-4">
        <div className="relative p-4">
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            className="p-2 mb-4 md:mb-0 md:mr-4 border rounded w-full md:w-auto"
            placeholder="Ingresa la ciudad"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg">
              {suggestions.map((suggestion, index: number) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
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
