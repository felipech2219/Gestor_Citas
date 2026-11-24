import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dumbbell, PlusCircle, Users } from "lucide-react";

function Home() {
  return (
    <section className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
          Sistema de Gestión de Citas
        </h1>
        <p className="text-gray-600 max-w-2xl text-base sm:text-lg mb-6">
          Bienvenido al centro de Entrenamiento Personal. Administra servicios de entrenamiento, servicios adicionales, entrenadores, horarios y restricciones de agenda.
        </p>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            Entrenamiento Personalizado
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Disponibilidad en Tiempo Real
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            Control de Restricciones
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-indigo-600" />
              Servicios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Consulta los paquetes de entrenamiento, costos y duración de cada sesión.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-purple-600" />
              Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Evaluación física, planes nutricionales y seguimiento de progreso.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Equipo de Entrenadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Especialistas calificados con horarios y agendas coordinadas.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Home;