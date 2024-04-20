import { useState } from "react"


interface LoaderStateProps{
    isLoading: boolean
    startLoading: ()=> void
    finishLoading: ()=> void
}

export function useLoading (): LoaderStateProps {
    const [isLoading, setIsLoading] = useState(false)

const startLoading = () => { console.log("Starting loading...");
                                setIsLoading(true);
                            console.log(isLoading); }

const finishLoading = () => { setIsLoading(false) }
    
    return(
        {isLoading,
        startLoading,
        finishLoading}
    );
}