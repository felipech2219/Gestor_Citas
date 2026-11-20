import { useState, useEffect } from "react";
import { getProfile, logout, getStoredToken, getStoredUser } from "../services/authService";
import DataStatus from "../components/common/DataStatus";

function Profile({ setPage }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const token = getStoredToken();
    const storedUser = getStoredUser();

    if (!token && !storedUser) {
      setLoading(false);
      setError("No hay una sesión activa. Por favor, inicia sesión para ver tu perfil.");
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
    <section>
      <h1>Perfil de Usuario</h1>

      <DataStatus
        loading={loading}
        error={error}
        empty={!user}
        emptyMessage="No se encontró información del perfil."
      >
        {user && (
          <div>
            <p>
              <strong>Nombre: </strong>
              {user.nombre || user.name || "No especificado"}
            </p>
            <p>
              <strong>Correo: </strong>
              {user.correo || user.email || "No especificado"}
            </p>
            {(user.rol || user.role) && (
              <p>
                <strong>Rol: </strong>
                {user.rol || user.role}
              </p>
            )}
            {(user.telefono || user.phone) && (
              <p>
                <strong>Teléfono: </strong>
                {user.telefono || user.phone}
              </p>
            )}

            <button type="button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </DataStatus>

      {!loading && error && typeof setPage === "function" && (
        <button type="button" onClick={() => setPage("login")}>
          Ir a Iniciar Sesión
        </button>
      )}
    </section>
  );
}

export default Profile;
