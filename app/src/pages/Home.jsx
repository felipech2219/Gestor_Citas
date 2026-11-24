function Home() {
  return (
    <section className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
          Sistema de Gestión de Citas
        </h1>
        <p className="text-gray-600 max-w-2xl text-base sm:text-lg mb-6">
          Bienvenido al centro de Entrenamiento Personal. Administra servicios de entrenamiento, servicios adicionales, entrenadores, horarios y restricciones de agenda.
        </p>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            Entrenamiento Personalizado
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Disponibilidad en Tiempo Real
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            Control de Restricciones
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xs">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Servicios</h3>
          <p className="text-sm text-gray-600">
            Consulta los paquetes de entrenamiento, costos y duración de cada sesión.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xs">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Adicionales</h3>
          <p className="text-sm text-gray-600">
            Evaluación física, planes nutricionales y seguimiento de progreso.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xs">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Equipo de Entrenadores</h3>
          <p className="text-sm text-gray-600">
            Especialistas calificados con horarios y agendas coordinadas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;