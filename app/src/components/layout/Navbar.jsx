function Navbar({ menu, setPage }) {
  return (
    <nav>
      <h2>Gestor de Citas</h2>

      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <button onClick={() => setPage(item.id)}>
              {item.nombre}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;