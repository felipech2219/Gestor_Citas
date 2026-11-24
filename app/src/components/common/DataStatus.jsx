import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

/**
 * Componente reutilizable para manejar estados de carga, error y vacío con componentes de interfaz.
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
      <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl shadow-xs my-4 text-indigo-600">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium text-gray-600">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (empty) {
    return (
      <div className="p-8 text-center bg-white border border-dashed border-gray-300 rounded-xl my-4">
        <p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return children;
}

export default DataStatus;
