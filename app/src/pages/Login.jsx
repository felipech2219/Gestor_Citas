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
    <section className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico:
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña:
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>
      </form>

      {error && (
        <p className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          Error: {error}
        </p>
      )}
      {success && (
        <p className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
          {success}
        </p>
      )}
    </section>
  );
}

export default Login;
