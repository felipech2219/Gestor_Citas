import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logout, getStoredToken, getStoredUser } from "../services/authService";
import DataStatus from "../components/common/DataStatus";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Profile() {
  const navigate = useNavigate();
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
    navigate("/login");
  };

  return (
    <section className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Perfil de Usuario</CardTitle>
        </CardHeader>

        <CardContent>
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
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            )}
          </DataStatus>

          {!loading && error && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button asChild>
                <Link to="/login">Ir a Iniciar Sesión</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default Profile;
