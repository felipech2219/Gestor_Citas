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
    <section>
      <h1>Servicios</h1>

      <DataStatus
        loading={loading}
        error={error}
        empty={services.length === 0}
        emptyMessage="No hay servicios disponibles en este momento."
      >
        <ul>
          {services.map((service, index) => (
            <li key={service.id || service._id || index}>
              <h3>{service.nombre || service.name || service.titulo || service.title}</h3>
              {(service.descripcion || service.description) && (
                <p>{service.descripcion || service.description}</p>
              )}
              {service.precio !== undefined && <p>Precio: ${service.precio}</p>}
              {service.duracion !== undefined && <p>Duración: {service.duracion} min</p>}
            </li>
          ))}
        </ul>
      </DataStatus>
    </section>
  );
}

export default Services;
