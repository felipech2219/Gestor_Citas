import { useState, useEffect } from "react";
import { getRestrictions } from "../services/restrictionsService";
import DataStatus from "../components/common/DataStatus";

function Restrictions() {
  const [restrictions, setRestrictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

            const date = restriction.fecha || restriction.date || restriction.fechaInicio;
            const startTime = restriction.horaInicio || restriction.hora_inicio || restriction.startTime;
            const endTime = restriction.horaFin || restriction.hora_fin || restriction.endTime;
            const employeeName =
              restriction.empleado?.nombre ||
              restriction.empleado?.name ||
              restriction.empleadoNombre ||
              restriction.employee?.name ||
              (restriction.empleadoId ? `Empleado #${restriction.empleadoId}` : null);

            return (
              <div
                key={restriction.id || restriction._id || index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {reason}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                      Bloqueo
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    {date && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Fecha:</span>{" "}
                        {date}
                      </p>
                    )}

                    {(startTime || endTime) && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Horas:</span>{" "}
                        {startTime || "--:--"} - {endTime || "--:--"}
                      </p>
                    )}

                    {employeeName && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Afecta a:</span>{" "}
                        {employeeName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
                  <span>ID: #{restriction.id || restriction._id || index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DataStatus>
    </section>
  );
}

export default Restrictions;