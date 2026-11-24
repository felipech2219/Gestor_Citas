function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-600">
          Gestor de Citas &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Sistema de Administración y Reserva de Entrenamiento Personal
        </p>
      </div>
    </footer>
  );
}

export default Footer;