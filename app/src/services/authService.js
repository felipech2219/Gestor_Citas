import { API_URL } from "./apiConfig";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export async function login(credentials) {
  try {
    let response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.status === 404) {
      response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    }

    if (!response.ok) {
      let errorMessage = "Credenciales incorrectas o error al iniciar sesión";
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignorar error al parsear JSON del fallo
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    const token = data.token || data.data?.token || data.access_token;
    const user = data.user || data.data?.user || data.usuario || data.data;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    if (user && typeof user === "object") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Error al conectar con el servicio de autenticación");
  }
}

export async function getProfile() {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers,
    });

    if (response.status === 404) {
      response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers,
      });
    }

    if (!response.ok) {
      const storedUser = getStoredUser();
      if (storedUser) {
        return storedUser;
      }
      throw new Error("No se pudo obtener la información del perfil");
    }

    const data = await response.json();
    const user = data.user || data.data?.user || data.data || data;

    if (user && typeof user === "object") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return user;
  } catch (error) {
    const storedUser = getStoredUser();
    if (storedUser) {
      return storedUser;
    }
    throw new Error(error.message || "Error al obtener la información del perfil");
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getStoredToken() || getStoredUser());
}
