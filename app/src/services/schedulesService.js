import { getResource } from "./apiConfig";

export async function getSchedules() {
  return await getResource("/schedules", "/horarios", "Error al obtener los horarios");
}
