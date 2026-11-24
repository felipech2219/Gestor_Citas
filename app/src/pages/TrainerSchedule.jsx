import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getEmployees } from "../services/employeesService";
import { getSchedules } from "../services/schedulesService";
import { getRestrictions } from "../services/restrictionsService";
import { getAppointments } from "../services/appointmentsService";
import DataStatus from "../components/common/DataStatus";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ShieldAlert,
  CalendarCheck2,
  User,
  Filter,
} from "lucide-react";

function TrainerSchedule() {
  const [searchParams] = useSearchParams();
  const initialEmployeeId = searchParams.get("employeeId") || "all";

  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(initialEmployeeId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getEmployees().catch(() => []),
      getSchedules().catch(() => []),
      getRestrictions().catch(() => []),
      getAppointments().catch(() => []),
    ])
      .then(([empRes, schedRes, restrRes, appRes]) => {
        if (!isMounted) return;

        setEmployees(Array.isArray(empRes) ? empRes : empRes?.data || []);
        setSchedules(Array.isArray(schedRes) ? schedRes : schedRes?.data || []);
        setRestrictions(Array.isArray(restrRes) ? restrRes : restrRes?.data || []);
        setAppointments(Array.isArray(appRes) ? appRes : appRes?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar la información de la agenda");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtrado por entrenador seleccionado
  const filterByEmployee = (list) => {
    if (selectedEmployeeId === "all") return list;
    return list.filter((item) => {
      const empId =
        item.empleadoId ||
        item.empleado_id ||
        item.empleado?.id ||
        item.employeeId ||
        item.entrenadorId;
      return String(empId) === String(selectedEmployeeId);
    });
  };

  const filteredSchedules = filterByEmployee(schedules);
  const filteredRestrictions = filterByEmployee(restrictions);
  const filteredAppointments = filterByEmployee(appointments);

  const getEmployeeName = (empId) => {
    const found = employees.find((e) => String(e.id || e._id) === String(empId));
    if (!found) return empId ? `Entrenador #${empId}` : "Sin asignar";
    return [found.nombre || found.name, found.apellido || found.lastname]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Agenda del Entrenador
          </h1>
          <p className="text-gray-600 mt-1">
            Modo consulta consolidado de turnos de disponibilidad, restricciones y citas programadas.
          </p>
        </div>

        {/* Filtro por entrenador */}
        {employees.length > 0 && (
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-xs">
            <Filter className="w-4 h-4 text-indigo-600 shrink-0" />
            <label htmlFor="trainer-select" className="text-xs font-medium text-gray-600">
              Entrenador:
            </label>
            <select
              id="trainer-select"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="text-sm border-gray-200 rounded px-2 py-1 text-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">Todos los entrenadores</option>
              {employees.map((emp) => (
                <option key={emp.id || emp._id} value={emp.id || emp._id}>
                  {[emp.nombre || emp.name, emp.apellido || emp.lastname]
                    .filter(Boolean)
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={
          schedules.length === 0 &&
          restrictions.length === 0 &&
          appointments.length === 0
        }
        loadingMessage="Cargando agenda del entrenador..."
        emptyMessage="No se encontró información de horarios, restricciones ni citas registradas."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna 1: Horarios de Disponibilidad */}
          <Card className="flex flex-col">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 rounded-t-xl">
              <CardTitle className="text-base font-semibold text-indigo-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                1. Horarios de Disponibilidad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 space-y-3">
              {filteredSchedules.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-500 border border-dashed rounded-lg">
                  No hay horarios configurados para el filtro actual.
                </div>
              ) : (
                filteredSchedules.map((item, idx) => {
                  const empName =
                    item.empleado?.nombre ||
                    item.empleadoNombre ||
                    getEmployeeName(item.empleadoId || item.employeeId);

                  return (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-white border border-gray-200 rounded-lg text-sm shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">
                          {item.dia || item.day || item.diaSemana || "Día"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-700 font-medium">
                          Disponible
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {item.horaInicio || item.hora_inicio || "--:--"} - {item.horaFin || item.hora_fin || "--:--"}
                      </p>
                      {empName && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {empName}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Columna 2: Restricciones y Bloqueos */}
          <Card className="flex flex-col">
            <CardHeader className="bg-amber-50/50 border-b border-amber-100 rounded-t-xl">
              <CardTitle className="text-base font-semibold text-amber-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                2. Restricciones y Bloqueos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 space-y-3">
              {filteredRestrictions.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-500 border border-dashed rounded-lg">
                  Sin bloqueos activos para el filtro actual.
                </div>
              ) : (
                filteredRestrictions.map((item, idx) => {
                  const empName =
                    item.empleado?.nombre ||
                    item.empleadoNombre ||
                    getEmployeeName(item.empleadoId || item.employeeId);

                  return (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-white border border-amber-200 rounded-lg text-sm shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">
                          {item.motivo || item.reason || "Bloqueo de horario"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                          Bloqueado
                        </span>
                      </div>
                      {(item.fecha || item.date) && (
                        <p className="text-xs text-gray-600">
                          Fecha: {item.fecha || item.date}
                        </p>
                      )}
                      <p className="text-xs text-amber-800 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {item.horaInicio || item.hora_inicio || "--:--"} - {item.horaFin || item.hora_fin || "--:--"}
                      </p>
                      {empName && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {empName}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Columna 3: Citas Agendadas */}
          <Card className="flex flex-col">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100 rounded-t-xl">
              <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4 text-blue-600" />
                3. Citas Programadas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 space-y-3">
              {filteredAppointments.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-500 border border-dashed rounded-lg">
                  No hay citas registradas en el sistema actualmente.
                </div>
              ) : (
                filteredAppointments.map((item, idx) => {
                  const clientName =
                    item.cliente?.nombre ||
                    item.clienteNombre ||
                    item.clientName ||
                    "Cliente";
                  const serviceName =
                    item.servicio?.nombre ||
                    item.servicioNombre ||
                    item.serviceName ||
                    "Servicio";
                  const empName =
                    item.empleado?.nombre ||
                    item.empleadoNombre ||
                    getEmployeeName(item.empleadoId || item.employeeId);

                  return (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-white border border-blue-200 rounded-lg text-sm shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">
                          {serviceName}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                          {item.estado || item.status || "Programada"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Cliente: <span className="font-medium text-gray-700">{clientName}</span>
                      </p>
                      {(item.fecha || item.date) && (
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {item.fecha || item.date} | {item.hora || item.horaInicio || "--:--"}
                        </p>
                      )}
                      {empName && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          Entrenador: {empName}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </DataStatus>
    </section>
  );
}

export default TrainerSchedule;
