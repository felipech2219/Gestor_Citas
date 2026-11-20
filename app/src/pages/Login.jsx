import { useState } from "react";
import { login } from "../services/authService";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await login({ email, password });
      setSuccess("Inicio de sesión exitoso.");
      setLoading(false);

      if (typeof setPage === "function") {
        setPage("profile");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Correo electrónico:</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Contraseña:</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>
      </form>

      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>}
    </section>
  );
}

export default Login;
