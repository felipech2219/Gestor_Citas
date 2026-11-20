import { getResource } from "./apiConfig";

export async function getRoles() {
  return await getResource("/roles", null, "Error al obtener los roles");
}
