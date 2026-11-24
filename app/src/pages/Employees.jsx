import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/employeesService";
import DataStatus from "../components/common/DataStatus";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, Mail, Phone, Award, User, ExternalLink } from "lucide-react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
            const fullName =
              [
                employee.nombre || employee.name,
                employee.apellido || employee.lastname || employee.apellidos,
              ]
                .filter(Boolean)
                .join(" ") || "Empleado sin nombre";

            const email = employee.email || employee.correo;
            const phone = employee.telefono || employee.phone;
            const role =
              employee.especialidad ||
              employee.specialty ||
              employee.rol ||
              employee.role ||
              employee.puesto;

            return (
              <Card
                key={employee.id || employee._id || index}
                className="flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">
                      {fullName}
                    </CardTitle>
                    {role && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 shrink-0">
                        {role}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    {email && (
                      <p className="flex items-center gap-2 break-all">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{email}</span>
                      </p>
                    )}
                    {phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{phone}</span>
                      </p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-gray-100 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Vista rápida
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1"
                  >
                    <Link to={`/employees/${employee.id || employee._id || index + 1}`}>
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Perfil
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </DataStatus>

      {/* Modal Dialog para detalle de empleado */}
      <Dialog
        open={Boolean(selectedEmployee)}
        onOpenChange={(open) => !open && setSelectedEmployee(null)}
      >
        {selectedEmployee && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <DialogTitle className="text-xl">
                  {[
                    selectedEmployee.nombre || selectedEmployee.name,
                    selectedEmployee.apellido || selectedEmployee.lastname || selectedEmployee.apellidos,
                  ]
                    .filter(Boolean)
                    .join(" ") || "Perfil de Empleado"}
                </DialogTitle>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {selectedEmployee.especialidad ||
                    selectedEmployee.specialty ||
                    selectedEmployee.rol ||
                    selectedEmployee.role ||
                    "Entrenador"}
                </span>
              </div>
              <DialogDescription>
                Información de contacto, especialidad y credenciales del profesional.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-gray-900">Identificador:</span>
                  <span>#{selectedEmployee.id || selectedEmployee._id || "N/A"}</span>
                </p>

                {(selectedEmployee.email || selectedEmployee.correo) && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-semibold text-gray-900">Correo:</span>
                    <span>{selectedEmployee.email || selectedEmployee.correo}</span>
                  </p>
                )}

                {(selectedEmployee.telefono || selectedEmployee.phone) && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-semibold text-gray-900">Teléfono:</span>
                    <span>{selectedEmployee.telefono || selectedEmployee.phone}</span>
                  </p>
                )}

                {(selectedEmployee.especialidad || selectedEmployee.specialty) && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-semibold text-gray-900">Especialidad:</span>
                    <span>{selectedEmployee.especialidad || selectedEmployee.specialty}</span>
                  </p>
                )}
              </div>

              {(selectedEmployee.biografia || selectedEmployee.bio || selectedEmployee.descripcion) && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Biografía / Experiencia
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {selectedEmployee.biografia || selectedEmployee.bio || selectedEmployee.descripcion}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedEmployee(null)}
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

export default Employees;