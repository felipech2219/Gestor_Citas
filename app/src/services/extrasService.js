import { getResource } from "./apiConfig";

export async function getExtras() {
  return await getResource("/extras", "/adicionales", "Error al obtener los servicios adicionales");
}
