import { getResource } from "./apiConfig";

export async function getAppointmentStatuses() {
  return await getResource(
    "/appointment-statuses",
    "/estados-cita",
    "Error al obtener los estados de cita"
  );
}
