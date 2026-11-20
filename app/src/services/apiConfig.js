export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Realiza una petición GET con soporte de fallback si un endpoint no existe (404)
 * @param {string} endpoint - Ruta principal
 * @param {string} [fallbackEndpoint] - Ruta alternativa (ej. inglés/español)
 * @param {string} [errorMessage] - Mensaje de error personalizado
 */
export async function getResource(endpoint, fallbackEndpoint = null, errorMessage = "Error al obtener los datos") {
  try {
    let response = await fetch(`${API_URL}${endpoint}`);

    if (response.status === 404 && fallbackEndpoint) {
      response = await fetch(`${API_URL}${fallbackEndpoint}`);
    }

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || errorMessage);
  }
}
