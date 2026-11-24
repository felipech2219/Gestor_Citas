import { getResource } from "./apiConfig";

export async function getEmployees() {
  return await getResource("/employees", "/empleados", "Error al obtener los empleados");
}

export async function getEmployeeById(id) {
  return await getResource(
    `/employees/${id}`,
    `/empleados/${id}`,
    "Error al obtener el empleado"
  );
}
