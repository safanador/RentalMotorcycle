import Link from "next/link";

interface PaginationBarProps{
    currentPage: number;
    totalPages:number;
}

export default function PaginationBar({currentPage, totalPages}:PaginationBarProps){
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10 ))
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

    const numberedPageItems: JSX.Element[] = []

    for(let page = minPage; page <= maxPage; page++){
        numberedPageItems.push(
            <Link href={"?page=" + page}
            key={page}
            className={`p-3 h-12 leading-tight text-gray-950 bg-gray-50 border border-gray-100 hover:bg-gray-400 hover:text-gray-700 ${currentPage===page ? "bg-gray-500": ""}`}> 
            {page}
            </Link>
        )
    }
    return(
        <>
        <div className=" hidden sm:block sm:mb-4">
            {numberedPageItems}
        </div>
        <div className="mb-4 block sm:hidden">
            {currentPage>1 &&
            <Link 
            href={"?page=" + (currentPage-1)}
            className="p-3 h-12 leading-tight text-gray-950 bg-gray-200 border border-gray-300 hover:bg-gray-400 hover:text-gray-700">
                «
            </Link>
            }
            <button className="p-3 h-12 leading-tight text-gray-950 bg-gray-50 border border-gray-100 hover:bg-gray-400 hover:text-gray-700">Page {currentPage}
            </button>
            {currentPage < totalPages && (
                <Link 
                href={"?page=" + (currentPage+1)}
                className="p-3 h-12 leading-tight text-gray-950 bg-gray-50 border border-gray-100 hover:bg-gray-400 hover:text-gray-700">
                    »
                </Link>
            ) }
        </div>
        </>
    )
}