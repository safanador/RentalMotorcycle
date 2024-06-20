"use client"
import React, { Suspense, useEffect, useState } from 'react';
import CorporateRentalBooking from '@/components/Corporate/RentalBooking';

const CorporatePage= () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CorporateRentalBooking />
    </Suspense>
      );
};

export default CorporatePage;
