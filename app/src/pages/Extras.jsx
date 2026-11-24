import { useState, useEffect } from "react";
import { getExtras } from "../services/extrasService";
import DataStatus from "../components/common/DataStatus";

function Extras() {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getExtras()
      .then((data) => {
        if (isMounted) {
          const items = Array.isArray(data) ? data : data?.data || [];
          setExtras(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los servicios adicionales");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Servicios Adicionales</h1>
        <p className="text-gray-600 mt-1">
          Complementos para potenciar y personalizar tus sesiones de entrenamiento.
        </p>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={extras.length === 0}
        loadingMessage="Cargando servicios adicionales..."
        emptyMessage="No hay servicios adicionales disponibles en este momento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extras.map((extra, index) => {
            const title = extra.nombre || extra.name || extra.titulo || extra.title || "Adicional sin nombre";
            const description = extra.descripcion || extra.description;
            const price = extra.precio ?? extra.price;
            const duration = extra.duracion ?? extra.duration;

            return (
              <div
                key={extra.id || extra._id || index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {title}
                    </h3>
                  </div>
                  {description && (
                    <p className="text-gray-600 text-sm mb-4">
                      {description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm mt-auto">
                  {price !== undefined && (
                    <div>
                      <span className="text-xs text-gray-500 block">Precio</span>
                      <span className="font-bold text-indigo-600 text-base">
                        ${Number(price).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {duration !== undefined && (
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Duración</span>
                      <span className="font-medium text-gray-700">
                        {duration} min
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DataStatus>
    </section>
  );
}

export default Extras;