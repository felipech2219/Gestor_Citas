import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getServiceById, getServices } from "../services/servicesService";
import DataStatus from "../components/common/DataStatus";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/common/ImageUpload";
import { ArrowLeft, Clock, DollarSign, Tag } from "lucide-react";

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Intenta buscar por ID directo; si falla, busca en la lista de servicios
    getServiceById(id)
      .then((data) => {
        if (isMounted) {
          const item = data?.data || data;
          setService(item);
          setLoading(false);
        }
      })
      .catch(() => {
        return getServices().then((list) => {
          if (isMounted) {
            const items = Array.isArray(list) ? list : list?.data || [];
            const found = items.find((s) => String(s.id || s._id) === String(id));
            if (found) {
              setService(found);
            } else {
              setError("No se encontró el servicio solicitado.");
            }
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar el detalle del servicio.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-2">
          <Link to="/services">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Volver a Servicios
          </Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Detalle del Servicio
        </h1>
      </div>

      <DataStatus
        loading={loading}
        error={error}
        empty={!service}
        emptyMessage="No se encontró información del servicio."
      >
        {service && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-2xl">
                  {service.nombre || service.name || service.titulo || service.title || "Servicio"}
                </CardTitle>
                {service.categoria && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {service.categoria}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {(service.descripcion || service.description) && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Descripción
                  </h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 leading-relaxed">
                    {service.descripcion || service.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Precio por sesión</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${Number(service.precio ?? service.price ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <DollarSign className="w-8 h-8 text-indigo-200" />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Duración de la sesión</span>
                    <span className="text-2xl font-bold text-gray-800">
                      {service.duracion ?? service.duration ?? "--"} min
                    </span>
                  </div>
                  <Clock className="w-8 h-8 text-gray-300" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <ImageUpload
                  id={`service-image-${id}`}
                  label="Fotografía ilustrativa del servicio"
                  value={service.imagenUrl || service.image || null}
                  onChange={(_file, previewUrl) => {
                    setService((prev) => ({ ...prev, imagenUrl: previewUrl }));
                  }}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
              <Button asChild variant="outline">
                <Link to="/services">Volver al listado</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </DataStatus>
    </section>
  );
}

export default ServiceDetail;
