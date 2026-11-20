import { getResource } from "./apiConfig";

export async function getEmployees() {
  return await getResource("/employees", "/empleados", "Error al obtener los empleados");
}
