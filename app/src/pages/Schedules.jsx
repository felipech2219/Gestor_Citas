import { useState, useEffect } from "react";
import { getSchedules } from "../services/schedulesService";
import DataStatus from "../components/common/DataStatus";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            const day = schedule.dia || schedule.day || schedule.diaSemana || schedule.nombreDia || "Día no especificado";
            const startTime = schedule.horaInicio || schedule.hora_inicio || schedule.startTime;
            const endTime = schedule.horaFin || schedule.hora_fin || schedule.endTime;
            const employeeName =
              schedule.empleado?.nombre ||
              schedule.empleado?.name ||
              schedule.empleadoNombre ||
              schedule.entrenador ||
              schedule.employee?.name ||
              (schedule.empleadoId ? `Empleado #${schedule.empleadoId}` : null);

            return (
              <div
                key={schedule.id || schedule._id || index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {day}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-50 text-green-700">
                      Disponible
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    {(startTime || endTime) && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Horario:</span>{" "}
                        {startTime || "--:--"} - {endTime || "--:--"}
                      </p>
                    )}

                    {employeeName && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Entrenador:</span>{" "}
                        {employeeName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
                  <span>ID: #{schedule.id || schedule._id || index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DataStatus>
    </section>
  );
}

export default Schedules;