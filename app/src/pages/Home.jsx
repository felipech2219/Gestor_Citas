import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, PlusCircle, Users, CalendarDays, ArrowRight } from "lucide-react";

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
          <Button asChild size="sm">
            <Link to="/services">
              Ver Servicios
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/schedule-agenda">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              Agenda del Entrenador
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-indigo-600" />
              Servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Consulta los paquetes de entrenamiento, costos y duración de cada sesión.
            </p>
            <Button asChild variant="ghost" size="sm" className="px-0 text-indigo-600 hover:text-indigo-700 hover:bg-transparent">
              <Link to="/services" className="inline-flex items-center gap-1">
                Explorar catálogo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-purple-600" />
              Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Evaluación física, planes nutricionales y seguimiento de progreso.
            </p>
            <Button asChild variant="ghost" size="sm" className="px-0 text-purple-600 hover:text-purple-700 hover:bg-transparent">
              <Link to="/extras" className="inline-flex items-center gap-1">
                Ver adicionales <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Equipo de Entrenadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Especialistas calificados con horarios y agendas coordinadas.
            </p>
            <Button asChild variant="ghost" size="sm" className="px-0 text-blue-600 hover:text-blue-700 hover:bg-transparent">
              <Link to="/employees" className="inline-flex items-center gap-1">
                Conocer equipo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Home;