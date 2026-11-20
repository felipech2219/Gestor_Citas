# Avance 1 / Martes 10 Noviembre
Proyecto base funcionando con estructura de carpetas, Layout, Navbar, Footer y navegación entre páginas vacías.

# Estado
En proceso

# Contexto del Proyecto
Este proyecto consiste en desarrollar una aplicación web para la gestión de citas de un Centro de Entrenamiento Personal.

El sistema permitirá administrar servicios de entrenamiento, servicios adicionales, entrenadores, horarios, restricciones y citas. Los clientes podrán registrarse, iniciar sesión, consultar información de su perfil y reservar sesiones según la disponibilidad de los entrenadores.

La aplicación utilizará una API REST como fuente principal de datos. El frontend consumirá los diferentes endpoints para consultar, crear, actualizar y eliminar información según los requerimientos de cada módulo.

La funcionalidad principal del sistema es la gestión de citas, permitiendo relacionar clientes, entrenadores, servicios y horarios disponibles para coordinar las sesiones de entrenamiento ofrecidas por el centro.

El sistema validará automáticamente la disponibilidad de cada entrenador considerando sus horarios, restricciones, servicios asignados y citas existentes, evitando conflictos y traslapes en la agenda.

Todo el desarrollo debe mantenerse consistente con los requisitos académicos del proyecto y con las reglas de negocio definidas en el enunciado oficial.

# Servicios Principales
- Entrenamiento Personalizado
- Entrenamiento de Fuerza
- Pérdida de Peso
- Entrenamiento Funcional
- Rehabilitación Física

# Servicios Adicionales
- Evaluación Física Inicial
- Plan Nutricional Básico
- Seguimiento de Progreso
- Sesión de Estiramiento Guiado

# Objetivo Principal
Permitir que los clientes agenden sesiones de entrenamiento con entrenadores especializados, calculando automáticamente el costo y duración total de la cita según el servicio principal y los servicios adicionales seleccionados, garantizando siempre la disponibilidad real del entrenador y la correcta gestión de la agenda.