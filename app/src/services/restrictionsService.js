import { getResource } from "./apiConfig";

export async function getRestrictions() {
  return await getResource("/restrictions", "/restricciones", "Error al obtener las restricciones");
}
