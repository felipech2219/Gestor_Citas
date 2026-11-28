import { useState, useEffect } from "react";
import { getSchedules } from "../services/schedulesService";
import DataStatus from "../components/common/DataStatus";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, Calendar, Clock, UserCheck } from "lucide-react";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getSchedules()
      .then((data) => {
        if (isMounted) {
          const items = Array.isArray(data) ? data : data?.data || [];
          setSchedules(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los horarios");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Horarios</h1>
        <p className="text-gray-600 mt-1">
          Jornadas y turnos de disponibilidad de los entrenadores.
        </p>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={schedules.length === 0}
        loadingMessage="Cargando horarios..."
        emptyMessage="No hay horarios registrados en este momento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule, index) => {
            const day =
              schedule.dia ||
              schedule.day ||
              schedule.diaSemana ||
              schedule.nombreDia ||
              "Día no especificado";
            const startTime =
              schedule.horaInicio || schedule.hora_inicio || schedule.startTime;
            const endTime =
              schedule.horaFin || schedule.hora_fin || schedule.endTime;
            const employeeName =
              schedule.empleado?.nombre ||
              schedule.empleado?.name ||
              schedule.empleadoNombre ||
              schedule.entrenador ||
              schedule.employee?.name ||
              (schedule.empleadoId ? `Empleado #${schedule.empleadoId}` : null);

            return (
              <Card
                key={schedule.id || schedule._id || index}
                className="flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      {day}
                    </CardTitle>
                    <Badge variant="success" className="shrink-0">
                      Disponible
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    {(startTime || endTime) && (
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{startTime || "--:--"} - {endTime || "--:--"}</span>
                      </p>
                    )}

                    {employeeName && (
                      <p className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{employeeName}</span>
                      </p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Ver Detalle
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </DataStatus>

      {/* Modal Dialog para detalle de horario */}
      <Dialog
        open={Boolean(selectedSchedule)}
        onOpenChange={(open) => !open && setSelectedSchedule(null)}
      >
        {selectedSchedule && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <DialogTitle className="text-xl">
                  {selectedSchedule.dia ||
                    selectedSchedule.day ||
                    selectedSchedule.diaSemana ||
                    "Detalle de Horario"}
                </DialogTitle>
                <Badge variant="success">
                  Turno Activo
                </Badge>
              </div>
              <DialogDescription>
                Rango horario y entrenador asignado para la atención de citas.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Día programado:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedSchedule.dia || selectedSchedule.day || "No indicado"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Hora de inicio:</span>
                  <span className="font-semibold text-indigo-600">
                    {selectedSchedule.horaInicio || selectedSchedule.hora_inicio || selectedSchedule.startTime || "--:--"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Hora de finalización:</span>
                  <span className="font-semibold text-indigo-600">
                    {selectedSchedule.horaFin || selectedSchedule.hora_fin || selectedSchedule.endTime || "--:--"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-medium">Entrenador:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedSchedule.empleado?.nombre ||
                      selectedSchedule.empleadoNombre ||
                      selectedSchedule.entrenador ||
                      (selectedSchedule.empleadoId ? `ID #${selectedSchedule.empleadoId}` : "Sin asignar")}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedSchedule(null)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

export default Schedules;