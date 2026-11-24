import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeesService";
import DataStatus from "../components/common/DataStatus";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getEmployees()
      .then((data) => {
        if (isMounted) {
          const items = Array.isArray(data) ? data : data?.data || [];
          setEmployees(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los empleados");
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Empleados</h1>
        <p className="text-gray-600 mt-1">
          Equipo de entrenadores y personal calificado del centro de entrenamiento.
        </p>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={employees.length === 0}
        loadingMessage="Cargando empleados..."
        emptyMessage="No hay empleados registrados en este momento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee, index) => {
            const fullName = [
              employee.nombre || employee.name,
              employee.apellido || employee.lastname || employee.apellidos,
            ]
              .filter(Boolean)
              .join(" ") || "Empleado sin nombre";

            const email = employee.email || employee.correo;
            const phone = employee.telefono || employee.phone;
            const role = employee.especialidad || employee.specialty || employee.rol || employee.role || employee.puesto;

            return (
              <div
                key={employee.id || employee._id || index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {fullName}
                    </h3>
                    {role && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {role}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                    {email && (
                      <p className="flex items-center gap-1.5 break-all">
                        <span className="font-medium text-gray-700">Correo:</span>{" "}
                        {email}
                      </p>
                    )}
                    {phone && (
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Teléfono:</span>{" "}
                        {phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
                  <span>ID: #{employee.id || employee._id || index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DataStatus>
    </section>
  );
}

export default Employees;