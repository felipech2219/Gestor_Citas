import { getResource } from "./apiConfig";

export async function getServices() {
  return await getResource("/services", "/servicios", "Error al obtener los servicios");
}
