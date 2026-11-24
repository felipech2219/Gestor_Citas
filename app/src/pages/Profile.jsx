import { useState, useEffect } from "react";
import { getProfile, logout, getStoredToken, getStoredUser } from "../services/authService";
import DataStatus from "../components/common/DataStatus";

function Profile({ setPage }) {
  const hasSession = Boolean(getStoredToken() || getStoredUser());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(hasSession);
  const [error, setError] = useState(
    hasSession
      ? null
      : "No hay una sesión activa. Por favor, inicia sesión para ver tu perfil."
  );

  useEffect(() => {
    let isMounted = true;
    const token = getStoredToken();
    const storedUser = getStoredUser();

    if (!token && !storedUser) {
      return;
    }

    getProfile()
      .then((data) => {
        if (isMounted) {
          const profileData = data?.user || data?.data || data;
          setUser(profileData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          if (storedUser) {
            setUser(storedUser);
            setLoading(false);
          } else {
            setError(err.message || "Error al consultar el perfil");
            setLoading(false);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    if (typeof setPage === "function") {
      setPage("login");
    }
  };

  return (
    <section className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil de Usuario</h1>

      <DataStatus
        loading={loading}
        error={error}
        empty={!user}
        emptyMessage="No se encontró información del perfil."
      >
        {user && (
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong className="font-semibold text-gray-900">Nombre: </strong>
              {user.nombre || user.name || "No especificado"}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold text-gray-900">Correo: </strong>
              {user.correo || user.email || "No especificado"}
            </p>
            {(user.rol || user.role) && (
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-900">Rol: </strong>
                {user.rol || user.role}
              </p>
            )}
            {(user.telefono || user.phone) && (
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-900">Teléfono: </strong>
                {user.telefono || user.phone}
              </p>
            )}

            <div className="pt-4 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs transition-colors cursor-pointer text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </DataStatus>

      {!loading && error && typeof setPage === "function" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setPage("login")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-xs transition-colors cursor-pointer text-sm"
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      )}
    </section>
  );
}

export default Profile;
