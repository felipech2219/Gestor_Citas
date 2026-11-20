/**
 * Componente reutilizable para manejar estados de carga, error y vacío.
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
    return <p>{loadingMessage}</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (empty) {
    return <p>{emptyMessage}</p>;
  }

  return children;
}

export default DataStatus;
