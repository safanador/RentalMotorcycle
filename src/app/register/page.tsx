"use client"
import { Form } from "@/components/LoginForm";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData:any) => {
    startLoading()
    await authFetch({
      endpoint: "/api/auth/register",
      redirectRoute: "/home",
      formData
    })
    finishLoading()
  }
  return (
   <div className="flex items-center justify-center min-h-[calc(100vh-121px)]">
      <Form title="Registro" 
      onSubmit={register} 
      description="Formulario para crear usuario">
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
        label="Email"
        name="email"
        placeholder="Ingresa tu correo..."
        />
        <Form.Input
        placeholder="Ingresa tu contraseña..."
        label="Contraseña"
        name="password"
        type="password"
        />
        <Form.Input
        placeholder="Confirma tu contraseña..."
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        />
        </div>
        <Form.SubmitButton buttonText="Crear Cuenta" isLoading={isLoading}/>
        <Form.Footer description="Ya tienes cuenta?" 
        link="/login"
        textLink="Inicia Sesión" />
      </Form>
   </div>
  );
}