import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

export default function Navbar() {
  const [carritoCount, setCarritoCount] = useState(0);
  const [animar, setAnimar] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarContador = () => {
      try {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);

        setCarritoCount((prev) => {
          if (prev !== total) {
            setAnimar(true);
            setTimeout(() => setAnimar(false), 300);
          }
          return total;
        });
      } catch (error) {
        console.error("Error al leer carrito:", error);
      }
    };

    actualizarContador();

    window.addEventListener("storage", actualizarContador);
    window.addEventListener("carritoActualizado", actualizarContador);

    return () => {
      window.removeEventListener("storage", actualizarContador);
      window.removeEventListener("carritoActualizado", actualizarContador);
    };
  }, [location]);

  useEffect(() => {
    const leerUsuario = () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        setUsuarioActivo(usuario);
      } catch {
        setUsuarioActivo(null);
      }
    };

    leerUsuario();

    window.addEventListener("storage", leerUsuario);
    window.addEventListener("userChanged", leerUsuario);

    return () => {
      window.removeEventListener("storage", leerUsuario);
      window.removeEventListener("userChanged", leerUsuario);
    };
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.dispatchEvent(new Event("userChanged"));
    setUsuarioActivo(null);
    alert("Sesión cerrada correctamente");
    navigate("/login");
  };

  const esAdmin = usuarioActivo?.rol === "Administrador";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          title="Volver al inicio"
        >
          NUBEPLAY
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {esAdmin ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className={`nav-link ${
                      location.pathname === "/admin" ? "active" : ""
                    }`}
                  >
                    Panel Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin-categorias"
                    className={`nav-link ${
                      location.pathname === "/admin-categorias" ? "active" : ""
                    }`}
                  >
                    Categorías
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin-usuarios"
                    className={`nav-link ${
                      location.pathname === "/admin-usuarios" ? "active" : ""
                    }`}
                  >
                    Usuarios
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/blog"
                    className={`nav-link ${
                      location.pathname === "/blog" ? "active" : ""
                    }`}
                  >
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/nosotros"
                    className={`nav-link ${
                      location.pathname === "/nosotros" ? "active" : ""
                    }`}
                  >
                    Nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contacto"
                    className={`nav-link ${
                      location.pathname === "/contacto" ? "active" : ""
                    }`}
                  >
                    Contacto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/carrito"
                    className={`nav-link ${
                      location.pathname === "/carrito" ? "active" : ""
                    }`}
                    title="Ver carrito de compras"
                  >
                    🛒 Carrito{" "}
                    <span
                      className={`badge bg-success ms-1 ${
                        animar ? "badge-animado" : ""
                      }`}
                    >
                      {carritoCount}
                    </span>
                  </Link>
                </li>
              </>
            )}

            {}
            {usuarioActivo ? (
              <li className="nav-item ms-2">
                <button
                  onClick={cerrarSesion}
                  className="btn btn-sm btn-outline-warning"
                  title="Cerrar sesión"
                >
                  <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/registro"
                    className={`nav-link ${
                      location.pathname === "/registro" ? "active" : ""
                    }`}
                  >
                    Registro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
