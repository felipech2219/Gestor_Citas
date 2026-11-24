function Appointments() {
  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Citas</h1>
        <p className="text-gray-600 mt-1">
          Módulo de gestión y reserva de citas de entrenamiento personal.
        </p>
      </div>

      <div className="p-8 text-center bg-white border border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-sm font-medium">
          Módulo de citas programado para el siguiente avance.
        </p>
      </div>
    </section>
  );
}

export default Appointments;