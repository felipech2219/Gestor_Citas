import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById, getEmployees } from "../services/employeesService";
import { getSchedules } from "../services/schedulesService";
import { getRestrictions } from "../services/restrictionsService";
import DataStatus from "../components/common/DataStatus";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, ShieldAlert } from "lucide-react";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getEmployeeById(id).catch(() =>
        getEmployees().then((list) => {
          const items = Array.isArray(list) ? list : list?.data || [];
          return items.find((e) => String(e.id || e._id) === String(id));
        })
      ),
      getSchedules().catch(() => []),
      getRestrictions().catch(() => []),
    ])
      .then(([empData, schedList, restrList]) => {
        if (!isMounted) return;

        const emp = empData?.data || empData;
        if (!emp) {
          setError("No se encontró el entrenador solicitado.");
          setLoading(false);
          return;
        }

        setEmployee(emp);

        const allSched = Array.isArray(schedList) ? schedList : schedList?.data || [];
        const empSched = allSched.filter((s) => {
          const sEmpId = s.empleadoId || s.empleado?.id || s.employeeId;
          return String(sEmpId) === String(id);
        });
        setSchedules(empSched);

        const allRestr = Array.isArray(restrList) ? restrList : restrList?.data || [];
        const empRestr = allRestr.filter((r) => {
          const rEmpId = r.empleadoId || r.empleado?.id || r.employeeId;
          return String(rEmpId) === String(id);
        });
        setRestrictions(empRestr);

        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar la información del entrenador.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const fullName = employee
    ? [
        employee.nombre || employee.name,
        employee.apellido || employee.lastname || employee.apellidos,
      ]
        .filter(Boolean)
        .join(" ") || "Entrenador"
    : "";

  return (
    <section className="max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-2">
          <Link to="/employees">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Volver a Empleados
          </Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Perfil del Entrenador
        </h1>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={!employee}
        emptyMessage="No se encontró información del entrenador."
      >
        {employee && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-2xl">{fullName}</CardTitle>
                  {(employee.especialidad || employee.specialty || employee.rol) && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded bg-indigo-50 text-indigo-700">
                      {employee.especialidad || employee.specialty || employee.rol}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {(employee.email || employee.correo) && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-gray-700 break-all">
                        {employee.email || employee.correo}
                      </span>
                    </div>
                  )}
                  {(employee.telefono || employee.phone) && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-gray-700">
                        {employee.telefono || employee.phone}
                      </span>
                    </div>
                  )}
                </div>

                {(employee.biografia || employee.bio || employee.descripcion) && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Biografía / Experiencia
                    </h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {employee.biografia || employee.bio || employee.descripcion}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Horarios asignados al entrenador */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Horarios Asignados
                </CardTitle>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No registra horarios asignados en el sistema.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {schedules.map((s, idx) => (
                      <div
                        key={s.id || idx}
                        className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm flex justify-between items-center"
                      >
                        <span className="font-semibold text-gray-800">
                          {s.dia || s.day || "Día"}
                        </span>
                        <span className="text-indigo-600 font-medium">
                          {s.horaInicio || s.hora_inicio || "--:--"} - {s.horaFin || s.hora_fin || "--:--"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Restricciones asignadas al entrenador */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  Restricciones y Bloqueos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {restrictions.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No cuenta con bloqueos ni restricciones registradas.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {restrictions.map((r, idx) => (
                      <div
                        key={r.id || idx}
                        className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-sm flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {r.motivo || r.reason || "Bloqueo de horario"}
                          </p>
                          {(r.fecha || r.date) && (
                            <p className="text-xs text-gray-600">
                              Fecha: {r.fecha || r.date}
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-amber-800">
                          {r.horaInicio || r.hora_inicio || "--:--"} - {r.horaFin || r.hora_fin || "--:--"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <Button asChild variant="outline">
                  <Link to="/employees">Volver al listado</Link>
                </Button>
                <Button asChild>
                  <Link to={`/schedule-agenda?employeeId=${id}`}>
                    Ver Agenda
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </DataStatus>
    </section>
  );
}

export default EmployeeDetail;
