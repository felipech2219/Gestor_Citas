import { useState, useEffect } from "react";
import { getServices } from "../services/servicesService";
import DataStatus from "../components/common/DataStatus";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getServices()
      .then((data) => {
        if (isMounted) {
          const items = Array.isArray(data) ? data : data?.data || [];
          setServices(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los servicios");
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Servicios</h1>
        <p className="text-gray-600 mt-1">
          Servicios de entrenamiento personal disponibles en nuestro centro.
        </p>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={services.length === 0}
        loadingMessage="Cargando servicios..."
        emptyMessage="No hay servicios disponibles en este momento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const title = service.nombre || service.name || service.titulo || service.title || "Servicio sin nombre";
            const description = service.descripcion || service.description;
            const price = service.precio ?? service.price;
            const duration = service.duracion ?? service.duration;

            return (
              <div
                key={service.id || service._id || index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {title}
                    </h3>
                    {service.categoria && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {service.categoria}
                      </span>
                    )}
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

export default Services;
