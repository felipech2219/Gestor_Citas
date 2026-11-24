/**
 * Componente reutilizable para manejar estados de carga, error y vacío con Tailwind CSS.
 *
 * @param {Object} props
 * @param {boolean} props.loading - Indica si los datos se están cargando
 * @param {string|null} [props.error] - Mensaje de error si la petición falló
 * @param {boolean} [props.empty] - Indica si la lista o dato está vacío
 * @param {string} [props.loadingMessage="Cargando información..."] - Mensaje de carga
 * @param {string} [props.emptyMessage="No hay datos disponibles."] - Mensaje cuando no hay elementos
 * @param {React.ReactNode} props.children - Contenido a renderizar cuando los datos están listos
 */
function DataStatus({
  loading,
  error,
  empty = false,
  loadingMessage = "Cargando información...",
  emptyMessage = "No hay datos disponibles.",
  children,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-lg shadow-xs my-4 text-indigo-600">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium text-gray-600">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-xs my-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-red-800">Error:</span>
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="p-8 text-center bg-white border border-dashed border-gray-300 rounded-lg my-4">
        <p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return children;
}

export default DataStatus;
