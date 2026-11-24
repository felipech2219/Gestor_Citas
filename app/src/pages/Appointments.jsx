import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

function Appointments() {
  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Citas</h1>
        <p className="text-gray-600 mt-1">
          Módulo de gestión y reserva de citas de entrenamiento personal.
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-8 text-center flex flex-col items-center justify-center">
          <CalendarDays className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">
            Módulo de citas programado para el siguiente avance.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Aquí podrás seleccionar servicios, fecha, horario y entrenador disponible.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default Appointments;