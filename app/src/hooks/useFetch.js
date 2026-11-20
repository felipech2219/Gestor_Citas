import { useState, useEffect } from "react";

/**
 * Hook reutilizable para consumo de datos con Fetch API, useEffect y control de estados.
 *
 * @param {Function} fetchFunction - Función asíncrona que realiza la petición
 * @param {Array} [dependencies=[]] - Dependencias del useEffect
 * @returns {{ data: any, loading: boolean, error: string|null, isEmpty: boolean, refetch: Function }}
 */
export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = () => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchFunction()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los datos");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    const cleanup = executeFetch();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const isEmpty =
    !loading &&
    !error &&
    (!data || (Array.isArray(data) && data.length === 0));

  return { data, loading, error, isEmpty, refetch: executeFetch };
}

export default useFetch;
