import { getResource } from "./apiConfig";

export async function getAppointments() {
  return await getResource(
    "/appointments",
    "/citas",
    "Error al obtener las citas"
  );
}

export async function getAppointmentById(id) {
  return await getResource(
    `/appointments/${id}`,
    `/citas/${id}`,
    "Error al obtener la cita"
  );
}
