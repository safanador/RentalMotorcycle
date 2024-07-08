"use client"
import { Form } from "@/components/LoginForm";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData:any) => {
    startLoading()
    await authFetch({
      endpoint: "/api/auth/forget-password",
      formData
    })
    finishLoading()
  }
  return (
   <div className="flex w-auto min-h-[calc(100vh-121px)] items-center	justify-center">
      <Form 
      title="Recuperar contraseña" 
      onSubmit={forgetPassword} 
      description="Formulario para recuperar contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
        label="Email"
        name="email"
        placeholder="Ingresa tu correo..."
        />
        </div>
        <Form.SubmitButton buttonText="Recuperar contraseña" isLoading={isLoading}/>
        <Form.Footer description="Volver al inicio" 
        link="/"
        textLink="Inicio" />
      </Form>
   </div>
  );
}