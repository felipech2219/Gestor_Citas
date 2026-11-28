import { useState, useEffect } from "react";
import { getRestrictions } from "../services/restrictionsService";
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
import { Eye, ShieldAlert, Calendar, Clock, UserX } from "lucide-react";

function Restrictions() {
  const [restrictions, setRestrictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestriction, setSelectedRestriction] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRestrictions()
      .then((data) => {
        if (isMounted) {
          const items = Array.isArray(data) ? data : data?.data || [];
          setRestrictions(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar las restricciones");
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Restricciones</h1>
        <p className="text-gray-600 mt-1">
          Bloqueos de agenda, ausencias e indisponibilidades de los entrenadores.
        </p>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={restrictions.length === 0}
        loadingMessage="Cargando restricciones..."
        emptyMessage="No hay restricciones registradas en este momento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restrictions.map((restriction, index) => {
            const reason =
              restriction.motivo ||
              restriction.reason ||
              restriction.descripcion ||
              restriction.description ||
              "Restricción de horario";

            const date =
              restriction.fecha ||
              restriction.date ||
              restriction.fechaInicio;
            const startTime =
              restriction.horaInicio ||
              restriction.hora_inicio ||
              restriction.startTime;
            const endTime =
              restriction.horaFin ||
              restriction.hora_fin ||
              restriction.endTime;
            const employeeName =
              restriction.empleado?.nombre ||
              restriction.empleado?.name ||
              restriction.empleadoNombre ||
              restriction.employee?.name ||
              (restriction.empleadoId ? `Empleado #${restriction.empleadoId}` : null);

            return (
              <Card
                key={restriction.id || restriction._id || index}
                className="flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      {reason}
                    </CardTitle>
                    <Badge variant="warning" className="shrink-0">
                      Bloqueo
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    {date && (
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{date}</span>
                      </p>
                    )}

                    {(startTime || endTime) && (
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{startTime || "--:--"} - {endTime || "--:--"}</span>
                      </p>
                    )}

                    {employeeName && (
                      <p className="flex items-center gap-2">
                        <UserX className="w-4 h-4 text-gray-400 shrink-0" />
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
                    onClick={() => setSelectedRestriction(restriction)}
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

      {/* Modal Dialog para detalle de restricción */}
      <Dialog
        open={Boolean(selectedRestriction)}
        onOpenChange={(open) => !open && setSelectedRestriction(null)}
      >
        {selectedRestriction && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <DialogTitle className="text-xl">
                  {selectedRestriction.motivo ||
                    selectedRestriction.reason ||
                    selectedRestriction.descripcion ||
                    "Detalle de Restricción"}
                </DialogTitle>
                <Badge variant="warning">
                  Bloqueo de Agenda
                </Badge>
              </div>
              <DialogDescription>
                Información del bloqueo para evitar traslape o reservas no disponibles.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Motivo:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedRestriction.motivo || selectedRestriction.reason || selectedRestriction.descripcion || "Restricción de horario"}
                  </span>
                </div>

                {(selectedRestriction.fecha || selectedRestriction.date) && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Fecha:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedRestriction.fecha || selectedRestriction.date}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Horario bloqueado:</span>
                  <span className="font-semibold text-amber-700">
                    {selectedRestriction.horaInicio || selectedRestriction.hora_inicio || "--:--"} - {selectedRestriction.horaFin || selectedRestriction.hora_fin || "--:--"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-medium">Entrenador afectado:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedRestriction.empleado?.nombre ||
                      selectedRestriction.empleadoNombre ||
                      selectedRestriction.entrenador ||
                      (selectedRestriction.empleadoId ? `ID #${selectedRestriction.empleadoId}` : "Sin especificar")}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedRestriction(null)}
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

export default Restrictions;