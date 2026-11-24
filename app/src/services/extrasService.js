import { getResource } from "./apiConfig";

export async function getExtras() {
  return await getResource("/extras", "/adicionales", "Error al obtener los servicios adicionales");
}

export async function getExtraById(id) {
  return await getResource(
    `/extras/${id}`,
    `/adicionales/${id}`,
    "Error al obtener el servicio adicional"
  );
}
