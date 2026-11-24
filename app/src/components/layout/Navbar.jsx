import { Button } from "@/components/ui/button";

function Navbar({ menu = [], setPage, currentPage }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage("home")}
              className="text-xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Gestor de Citas
            </button>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {menu.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <Button
                    type="button"
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPage(item.id)}
                    className={
                      isActive
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }
                  >
                    {item.nombre}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;