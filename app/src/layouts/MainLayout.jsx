import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout({ children, menu, setPage }) {
  return (
    <>
      <Navbar menu={menu} setPage={setPage} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;