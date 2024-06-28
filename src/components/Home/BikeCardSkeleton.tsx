import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard(){
    return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="skeleton group  p-2 sm:p-5 rounded-3xl m-1 sm:m-5 h-80"/>
        <Skeleton className="skeleton group  p-2 sm:p-5 rounded-3xl m-1 sm:m-5 h-80"/>
        <Skeleton className="skeleton group  p-2 sm:p-5 rounded-3xl m-1 sm:m-5 h-80"/>
        <Skeleton className="skeleton group  p-2 sm:p-5 rounded-3xl m-1 sm:m-5 h-80"/>
    </div>
    )
    
}