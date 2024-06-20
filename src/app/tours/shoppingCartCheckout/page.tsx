// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Wallet } from 'lucide-react';
import { FaHeadset } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import Image from 'next/image';
import { es } from 'date-fns/locale'; // Import the Spanish locale
import { format } from "date-fns";
import TourCheckOut from '@/components/Tours/TourCheckout';




const TourCheckoutPage: React.FC = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TourCheckOut />
    </Suspense>
  );
};

export default TourCheckoutPage;
