import { useState, useEffect } from "react";
import { getExtras } from "../services/extrasService";
import DataStatus from "../components/common/DataStatus";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, Clock, DollarSign, PlusCircle } from "lucide-react";

function Extras() {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);

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
            const title =
              extra.nombre ||
              extra.name ||
              extra.titulo ||
              extra.title ||
              "Adicional sin nombre";
            const description = extra.descripcion || extra.description;
            const price = extra.precio ?? extra.price;
            const duration = extra.duracion ?? extra.duration;

            return (
              <Card
                key={extra.id || extra._id || index}
                className="flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">
                      {title}
                    </CardTitle>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 shrink-0 flex items-center gap-1">
                      <PlusCircle className="w-3 h-3" />
                      Adicional
                    </span>
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

                <CardFooter className="pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedExtra(extra)}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Ver Detalle
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </DataStatus>

      {/* Modal Dialog para detalle de servicio adicional */}
      <Dialog
        open={Boolean(selectedExtra)}
        onOpenChange={(open) => !open && setSelectedExtra(null)}
      >
        {selectedExtra && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <DialogTitle className="text-xl">
                  {selectedExtra.nombre ||
                    selectedExtra.name ||
                    selectedExtra.titulo ||
                    selectedExtra.title ||
                    "Detalle de Servicio Adicional"}
                </DialogTitle>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                  Adicional
                </span>
              </div>
              <DialogDescription>
                Información sobre beneficios, costos y tiempo adicional a la cita.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {(selectedExtra.descripcion || selectedExtra.description) && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Descripción
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {selectedExtra.descripcion || selectedExtra.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Costo adicional</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ${Number(selectedExtra.precio ?? selectedExtra.price ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Tiempo añadido</span>
                  <span className="text-lg font-semibold text-gray-800">
                    +{selectedExtra.duracion ?? selectedExtra.duration ?? 0} min
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedExtra(null)}
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

export default Extras;