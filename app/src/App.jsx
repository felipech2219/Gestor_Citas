import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Extras from "./pages/Extras";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail";
import Schedules from "./pages/Schedules";
import Restrictions from "./pages/Restrictions";
import Appointments from "./pages/Appointments";
import TrainerSchedule from "./pages/TrainerSchedule";
import NotFound from "./pages/NotFound";

function App() {
  const menu = [
    { path: "/", nombre: "Inicio" },
    { path: "/profile", nombre: "Perfil" },
    { path: "/services", nombre: "Servicios" },
    { path: "/extras", nombre: "Adicionales" },
    { path: "/employees", nombre: "Empleados" },
    { path: "/schedules", nombre: "Horarios" },
    { path: "/restrictions", nombre: "Restricciones" },
    { path: "/appointments", nombre: "Citas" },
    { path: "/schedule-agenda", nombre: "Agenda" },
    { path: "/register", nombre: "Registro" },
    { path: "/login", nombre: "Acceder" }
  ];

  return (
    <BrowserRouter>
      <MainLayout menu={menu}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/restrictions" element={<Restrictions />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/schedule-agenda" element={<TrainerSchedule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
