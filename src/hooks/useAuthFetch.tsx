import NotificationContext from "@/context/NotificationContext"
import axios, { AxiosRequestConfig } from "axios"
import { useRouter } from "next/navigation"
import { useContext } from "react"


interface AuthFetchProps{
    endpoint: string
    redirectRoute?: string
    formData?:any
    requestData?:any
    options?: AxiosRequestConfig<any>
}

export function useAuthFetch(){
    const {showNotification} = useContext(NotificationContext)
    const router= useRouter()

    const authRouter = async ({
        endpoint,
        redirectRoute,
        formData,
        requestData,
        options
    }: AuthFetchProps) => {
        try {

            const {data} = await axios.post(`${endpoint}` , formData || requestData, options)

            showNotification({
                msj:data.message,
                open:true,
                status: "success"
            })

            if(redirectRoute) router.push(redirectRoute)

        } catch (error:any) {

            showNotification({
            msj:error.response.data.message as string ,
            open: true,
            status: "error"
            })
        }
    }
    return authRouter
}