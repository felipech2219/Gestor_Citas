import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function Register() {
  return (
    <section className="max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Registro</CardTitle>
          <CardDescription>
            Formulario de registro de nuevos clientes en desarrollo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            Próximamente podrás crear tu cuenta para reservar sesiones personalizadas.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default Register;
