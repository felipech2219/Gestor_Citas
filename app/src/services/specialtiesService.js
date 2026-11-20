import { getResource } from "./apiConfig";

export async function getSpecialties() {
  return await getResource("/specialties", "/especialidades", "Error al obtener las especialidades");
}
