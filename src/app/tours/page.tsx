import PaginationBar from "@/components/Pagination/PaginationBar";
import TourCard from "@/components/Tours/TourCard";
import Tours from "../models/Tours";

interface HomeProps{
  searchParams:{page: string}
}

export default async function Home({searchParams:{page = "1"}}:HomeProps) {
  const currentPage = parseInt(page)

  const pageSize = 6;

  const totalItemCount = await Tours.estimatedDocumentCount();

  const totalPages = Math.ceil((totalItemCount)/ pageSize)

  const tours = await Tours.find()
  .limit(pageSize*1)  
  .skip((currentPage - 1) * pageSize)
  .exec();
    
  return (
    <div className="flex flex-col items-center">
      {/*{currentPage === 1 && 
      (<div className="hero rounded-xl bd-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
              href={"/products/" + products[0].id}
              className="btn btn-primary">
                Check it out
              </Link>
            </div>
        </div>
      </div>)}
       */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <TourCard tour={tour} key={tour.id}/>
        ))}
      </div>
      {totalPages > 1 &&
      <PaginationBar currentPage={currentPage} totalPages={totalPages}/>
      }
    </div>
    
  );
}
