import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";

/**
 * Componente reutilizable para carga y vista previa de imágenes (input file + preview).
 * Diseñado para ser integrado en formularios y módulos como el de Servicios.
 *
 * @param {Object} props
 * @param {string} [props.value] - URL o dato base64 de imagen inicial/existente
 * @param {Function} [props.onChange] - Callback (file: File|null, previewUrl: string|null)
 * @param {string} [props.label="Imagen del servicio"] - Texto de la etiqueta
 * @param {string} [props.id="image-upload"] - ID del input file
 * @param {number} [props.maxSizeMB=5] - Tamaño máximo permitido en MB
 * @param {string} [props.accept="image/*"] - Formatos aceptados
 * @param {boolean} [props.disabled=false] - Deshabilitar interacción
 */
function ImageUpload({
  value = null,
  onChange,
  label = "Imagen del servicio",
  id = "image-upload",
  maxSizeMB = 5,
  accept = "image/png, image/jpeg, image/webp, image/gif",
  disabled = false,
}) {
  const [internalPreview, setInternalPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const preview = internalPreview !== null ? internalPreview : value;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      setError("El archivo seleccionado debe ser una imagen válida.");
      return;
    }

    // Validar tamaño máximo
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`La imagen excede el límite máximo de ${maxSizeMB} MB.`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setInternalPreview(objectUrl);

    if (typeof onChange === "function") {
      onChange(file, objectUrl);
    }
  };

  const handleRemove = () => {
    setInternalPreview("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (typeof onChange === "function") {
      onChange(null, null);
    }
  };

  const handleTriggerClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-3">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Vista previa si existe una imagen cargada */}
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-3">
          <div className="relative w-full max-h-64 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
            <img
              src={preview}
              alt="Vista previa de imagen"
              className="max-h-60 w-auto object-contain rounded-md shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 mt-3 w-full justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTriggerClick}
              disabled={disabled}
            >
              Cambiar imagen
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="w-4 h-4 mr-1" />
              Quitar
            </Button>
          </div>
        </div>
      ) : (
        /* Zona de carga interactiva cuando no hay imagen */
        <div
          onClick={handleTriggerClick}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            disabled
              ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
              : "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50/30 bg-white"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Haz clic para seleccionar o subir una imagen
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, WEBP o GIF (hasta {maxSizeMB} MB)
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              handleTriggerClick();
            }}
          >
            <Upload className="w-4 h-4 mr-1" />
            Explorar archivo
          </Button>
        </div>
      )}

      {/* Input de tipo file oculto */}
      <Input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Alerta de error si falla la validación */}
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default ImageUpload;
