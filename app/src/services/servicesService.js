import { getResource } from "./apiConfig";

export async function getServices() {
  return await getResource("/services", "/servicios", "Error al obtener los servicios");
}

export async function getServiceById(id) {
  return await getResource(
    `/services/${id}`,
    `/servicios/${id}`,
    "Error al obtener el servicio"
  );
}
