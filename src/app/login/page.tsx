"use client"
import { Form } from "@/components/LoginForm";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData:any) => {
    startLoading()
    await authFetch({
      endpoint: "/api/auth/login",
      redirectRoute: "/user",
      formData
    })
    finishLoading()
  }
  return (
    <div className=" flex w-auto min-h-[calc(100vh-64px)] items-center	justify-center ">
   <div className="m-auto">
      <Form title="Inicia Sesión" 
      onSubmit={login} 
      description="Formulario para iniciar sesión"
      
      >
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
        </div>
        <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading}/>
        <Form.Footer description="Olvidaste tu contraseña?" link="/forget-password"
        textLink="Recuperar contraseña" />

        <Form.Footer description="Aún no tienes cuenta?" link="/register"
        textLink="Registrate" />
      </Form>
   </div>
   </div>
  );
}