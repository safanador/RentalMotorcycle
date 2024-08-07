"use client"
import { Form } from "@/components/LoginForm";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
//import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  //const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const changePassword = async (formData:any) => {
    startLoading()

    const params = new URLSearchParams(document.location.search);
    const token = params.get("token"); // is the token
    
    // token = searchParams.get("token") useSearchParams more necessary for UI rendering, not const call
    
    
    const options: AxiosRequestConfig<any> = {
      headers:{token}
    }

    await authFetch({
      endpoint: "/api/auth/change-password",
      redirectRoute: "/",
      formData,
      options
    })
    finishLoading()
  }
  return (
   <section className="flex w-auto min-h-[calc(100vh-181px)] lg:min-h-[calc(100vh-121px)] items-center	justify-center" >
    <div className="m-auto">
      <Form title="Cambiar tu contraseña" 
      onSubmit={changePassword} 
      description="Formulario para cambiar contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
        
        <Form.Input
        placeholder="Ingresa tu contraseña..."
        label="Nueva Contraseña"
        name="newPassword"
        type="password"
        />
        <Form.Input
        placeholder="Confirma tu contraseña..."
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        />
        </div>
        <Form.SubmitButton buttonText="Cambia tu contraseña" isLoading={isLoading}/>
        <Form.Footer description="Ya tienes cuenta?" 
        link="/"
        textLink="Inicia Sesión" />
      </Form>
    </div>
   </section>
  );
}