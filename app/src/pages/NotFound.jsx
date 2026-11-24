import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

function NotFound() {
  return (
    <section className="max-w-md mx-auto my-12">
      <Card className="text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileQuestion className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">404</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Página no encontrada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            La ruta que intentas consultar no existe o ha sido movida.
          </p>
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default NotFound;
