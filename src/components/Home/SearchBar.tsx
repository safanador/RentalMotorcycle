'use client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { isBefore, isSameDay, startOfDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect, useCallback } from 'react';
import { ILocationProps } from '@/app/models/Location';
import { es } from 'date-fns/locale';
import { Loader } from '../Loader';


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

const validationSchema = yup.object().shape({
  locationId: yup
    .string()
    .required('* Seleccione una locación entre las sugerencias'),
  pickupDate: yup
    .date()
    .required('La fecha de recogida es requerida')
    .min(startOfDay(new Date()), 'La fecha de recogida no puede ser anterior al día presente'),
  dropoffDate: yup
    .date()
    .required('La fecha de entrega es requerida')
    .test('is-after-pickup', 'La fecha de entrega no puede ser antes de la fecha de recogida', function (value) {
      const { pickupDate } = this.parent;
      return isBefore(new Date(pickupDate), new Date(value));
    })
    .test('is-not-same-day', 'La fecha de recogida y entrega no pueden ser el mismo día', function (value) {
      const { pickupDate } = this.parent;
      return !isSameDay(new Date(pickupDate), new Date(value));
    }),
  pickupTime: yup
    .string()
    .required('*La hora de recogida es requerida')
    .test('is-valid-time', '* La hora de recogida debe estar entre 08:00 y 17:00', (value) => {
      const [hour, minute] = value.split(':').map(Number);
      return hour >= 8 && hour <= 17;
    }),
  dropoffTime: yup
    .string()
    .required('* La hora de entrega es requerida')
    .test('is-valid-time', '* La hora de entrega debe estar entre 08:00 y 17:00', (value) => {
      const [hour, minute] = value.split(':').map(Number);
      return hour >= 8 && hour <= 17;
    }),
});

const SearchBar: React.FC = () => {
  const oneDayPlusInMiliSec = 24 * 60 * 60 * 1000
  // la siguiente linea configura el dia minimo de recogida
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(startDate!.getTime()+ oneDayPlusInMiliSec));

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      location: '',
      locationId: '',
      pickupDate: startDate,
      dropoffDate: endDate ,
      pickupTime: '',
      dropoffTime: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      router.push(`/rental/search?loc=${values.locationId}&pud=${values.pickupDate?.toISOString().split('T')[0]}&put=${values.pickupTime}&dod=${values.dropoffDate?.toISOString().split('T')[0]}&dot=${values.dropoffTime}`); 

    },
  });
  
  // Sugerencias
  const [suggestions, setSuggestions] = useState<ILocationProps[]>([]);
  const searchLocationQuery = formik.values.location;
  const locationId = formik.values.locationId

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(debounce(async (searchLocationQuery) => {
    if (searchLocationQuery && !locationId) {
      const fetchedLocationByName = await fetch(`/api/rental/getLocationByName?name=${searchLocationQuery}`, {
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
    fetchSuggestions(searchLocationQuery);
  }, [searchLocationQuery, fetchSuggestions]);

  const handleSuggestionClick = (suggestion: ILocationProps) => {
    formik.setFieldValue('location', suggestion.name);
    formik.setFieldValue('locationId',suggestion._id);
    setSuggestions([]);
  };

  return (
  <section>
    <form onSubmit={formik.handleSubmit} className="flex flex-col lg:flex-row items-center justify-center p-1 bg-yellow-500 rounded-lg shadow-lg">
      <div className="flex flex-col w-full lg:flex-row items-center lg:mb-0">
        <div className="relative w-full lg:w-1/2 lg:mr-1 mb-1 lg:mb-0">
          
          <input
            type="text"
            name="location"
            value={formik.values.location}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('locationId', '');
            }}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full h-10"
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
        <div className="flex w-full lg:w-1/4 items-center justify-between lg:justify-start lg:mr-1 mb-1 lg:mb-0 ">
          <div className="w-[60%] lg:w-full mr-1">
            <DatePicker
              selectsStart
              selected={formik.values.pickupDate}
              onChange={(date) => {
                formik.setFieldValue('pickupDate', date);
                formik.setFieldValue('dropoffDate', new Date(date!.getTime()+ oneDayPlusInMiliSec));
              }}
              startDate={formik.values.pickupDate}
              endDate={formik.values.dropoffDate}
              minDate={date}
              dateFormat="PPP"
              locale={es}
              placeholderText="Fecha de recogida"
              className="p-2 border rounded w-full h-10"
              wrapperClassName='w-full'
            />
          </div>
          
          <div className="w-[40%] lg:w-full">
          <select
            name="pickupTime"
            value={formik.values.pickupTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full h-10"
          >
            <option value="">Hora de recogida</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="flex w-full lg:w-1/4 items-center justify-between lg:justify-start lg:mr-1 mb-1 lg:mb-0">
          <div className="w-[60%] lg:w-1/2 mr-1">
            <DatePicker
              selectsEnd
              selected={formik.values.dropoffDate}
              onChange={(date) => formik.setFieldValue('dropoffDate', date)}
              endDate={formik.values.dropoffDate}
              startDate={formik.values.pickupDate}
              minDate={new Date(formik.values.pickupDate!.getTime()+ oneDayPlusInMiliSec)}
              dateFormat="PPP"
              placeholderText="Fecha de entrega"
              className="p-2 block border rounded w-full h-10"
              wrapperClassName='w-full'
              locale={es}
            />
          </div>
          <div className="w-[40%] lg:w-full">
          <select
            name="dropoffTime"
            value={formik.values.dropoffTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full h-10"
          >
            <option value="">Hora de entrega</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          </div>
        </div>
      </div>
      <button type="submit"  className="p-2 bg-blue-500 text-white rounded w-full lg:w-auto h-10">
        Buscar
      </button>
    </form>

    {formik.errors.locationId && formik.touched.locationId && <div className="text-red-500 text-sm">{formik.errors.locationId}</div>}

    {formik.errors.pickupTime && formik.touched.pickupTime && <div className="text-red-500 text-sm">{formik.errors.pickupTime}</div>}

    {formik.errors.dropoffTime && formik.touched.dropoffTime && <div className="text-red-500 text-sm">{formik.errors.dropoffTime}</div>}

  </section>
  );
};

export default SearchBar;
