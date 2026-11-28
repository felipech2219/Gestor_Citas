import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/servicesService";
import DataStatus from "../components/common/DataStatus";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import ImageUpload from "@/components/common/ImageUpload";
import { Eye, Clock, DollarSign, ExternalLink } from "lucide-react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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
            const title =
              service.nombre ||
              service.name ||
              service.titulo ||
              service.title ||
              "Servicio sin nombre";
            const description = service.descripcion || service.description;
            const price = service.precio ?? service.price;
            const duration = service.duracion ?? service.duration;

            return (
              <Card
                key={service.id || service._id || index}
                className="flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">
                      {title}
                    </CardTitle>
                    {service.categoria && (
                      <Badge variant="info" className="shrink-0">
                        {service.categoria}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  {description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {description}
                    </p>
                  )}

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-sm">
                    {price !== undefined && (
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="flex items-center gap-1 text-xs">
                          <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                          Precio
                        </span>
                        <span className="font-bold text-indigo-600 text-base">
                          ${Number(price).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {duration !== undefined && (
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="flex items-center gap-1 text-xs">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          Duración
                        </span>
                        <span className="font-medium text-gray-700">
                          {duration} min
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-gray-100 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedService(service)}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Vista rápida
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1"
                  >
                    <Link to={`/services/${service.id || service._id || index + 1}`}>
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Detalle
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </DataStatus>

      {/* Modal Dialog para vista de detalle del servicio */}
      <Dialog
        open={Boolean(selectedService)}
        onOpenChange={(open) => !open && setSelectedService(null)}
      >
        {selectedService && (
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <DialogTitle className="text-xl">
                  {selectedService.nombre ||
                    selectedService.name ||
                    selectedService.titulo ||
                    selectedService.title ||
                    "Detalle del Servicio"}
                </DialogTitle>
                {selectedService.categoria && (
                  <Badge variant="info">
                    {selectedService.categoria}
                  </Badge>
                )}
              </div>
              <DialogDescription>
                Información detallada y configuración multimedia del servicio.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {(selectedService.descripcion || selectedService.description) && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Descripción
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {selectedService.descripcion || selectedService.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Precio por sesión</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ${Number(selectedService.precio ?? selectedService.price ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Duración estimada</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {selectedService.duracion ?? selectedService.duration ?? "--"} min
                  </span>
                </div>
              </div>

              {/* Componente reutilizable de carga y vista previa de imagen */}
              <div className="pt-2 border-t border-gray-100">
                <ImageUpload
                  id={`service-image-${selectedService.id || "preview"}`}
                  label="Fotografía ilustrativa del servicio"
                  value={selectedService.imagenUrl || selectedService.image || null}
                  onChange={(file, previewUrl) => {
                    // Guarda o actualiza la vista previa localmente para el servicio seleccionado
                    setSelectedService((prev) => ({
                      ...prev,
                      imagenUrl: previewUrl,
                    }));
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedService(null)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

export default Services;
