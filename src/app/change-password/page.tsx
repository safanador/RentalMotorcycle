"use client"
import { Form } from "@/components/LoginForm";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const changePassword = async (formData:any) => {
    startLoading()
    
    const token = searchParams.get("token")
    
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
   <>
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
   </>
  );
}