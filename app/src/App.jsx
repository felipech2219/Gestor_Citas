import { useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Extras from "./pages/Extras";
import Employees from "./pages/Employees";
import Schedules from "./pages/Schedules";
import Restrictions from "./pages/Restrictions";
import Appointments from "./pages/Appointments";

function App() {
  const [page, setPage] = useState("home");

  const menu = [
    { id: "home", nombre: "Inicio" },
    { id: "login", nombre: "Login" },
    { id: "register", nombre: "Registro" },
    { id: "profile", nombre: "Perfil" },
    { id: "services", nombre: "Servicios" },
    { id: "extras", nombre: "Adicionales" },
    { id: "employees", nombre: "Empleados" },
    { id: "schedules", nombre: "Horarios" },
    { id: "restrictions", nombre: "Restricciones" },
    { id: "appointments", nombre: "Citas" },
  ];

  let content;

  switch (page) {
    case "login":
      content = <Login />;
      break;
    case "register":
      content = <Register />;
      break;
    case "profile":
      content = <Profile />;
      break;
    case "services":
      content = <Services />;
      break;
    case "extras":
      content = <Extras />;
      break;
    case "employees":
      content = <Employees />;
      break;
    case "schedules":
      content = <Schedules />;
      break;
    case "restrictions":
      content = <Restrictions />;
      break;
    case "appointments":
      content = <Appointments />;
      break;
    default:
      content = <Home />;
  }

  return (
    <MainLayout menu={menu} setPage={setPage}>
      {content}
    </MainLayout>
  );
}

export default App;