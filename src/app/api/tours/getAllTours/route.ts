// app/api/tours/getAllTours/route.ts
import { NextRequest, NextResponse } from 'next/server';
//import redisClient from '@/utils/redisClient';
import { connectMongoDB } from '@/app/libs/mongodb';
import Tours from '@/app/models/Tours';

export async function POST(req: NextRequest) {
  const { page = '1' } = await req.json();
  const currentPage = parseInt(page as string);
  const pageSize = 6;
  const cacheKey = `tours-page-${currentPage}`;
  
  // Check if data is cached
  {/*
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData));
  }
 */}
  // If not cached, fetch from database
  await connectMongoDB();
  const totalItemCount = await Tours.estimatedDocumentCount();
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const tours = await Tours.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)
    .exec();

  const data = {
    tours: JSON.parse(JSON.stringify(tours)),
    totalPages,
    currentPage,
  };

  // Cache the data
  {/*
  await redisClient.set(cacheKey, JSON.stringify(data), {
    EX: 3600, // Expire after 1 hour
  });
 */}
  return NextResponse.json(data);
}
