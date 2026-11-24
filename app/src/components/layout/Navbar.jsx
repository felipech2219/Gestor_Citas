import { Link, NavLink } from "react-router-dom";

function Navbar({ menu = [] }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Gestor de Citas
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {menu.map((item) => (
              <li key={item.path || item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-3 py-1.5 cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }`
                  }
                >
                  {item.nombre}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;