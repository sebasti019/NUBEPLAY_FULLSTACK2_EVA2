import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../imagenes/bienvenido_nubeplay.png";
import { agregarAlCarrito } from "../utils/carrito";

export default function Home() {
  const navigate = useNavigate();
  const [mostrarSaludo, setMostrarSaludo] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const cargarDatos = () => {
    const admin = JSON.parse(localStorage.getItem("productosAdmin")) || [];
    const categoriasGuardadas = JSON.parse(
      localStorage.getItem("categorias")
    ) || ["Celulares", "Audífonos", "Juegos"];

    setProductos(admin);
    setCategorias(categoriasGuardadas);
  };

  useEffect(() => {
    cargarDatos();

    const actualizarDatos = () => cargarDatos();
    window.addEventListener("storage", actualizarDatos);

    return () => window.removeEventListener("storage", actualizarDatos);
  }, []);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario) {
      setNombreUsuario(usuario.nombre.split(" ")[0]);
      setMostrarSaludo(true);
      const timer = setTimeout(() => setMostrarSaludo(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const productosFiltrados = filtro
    ? productos.filter((p) => p.categoria === filtro)
    : productos;

  const scrollToProductos = () => {
    const seccion = document.getElementById("productos");
    if (seccion) seccion.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container-fluid p-0">
      {}
      <header
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "85vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">Bienvenido a NUBEPLAY</h1>
          <p className="lead fs-4 mb-4">
            Tu tienda de tecnología y videojuegos favorita
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={scrollToProductos}
          >
            Ver Productos
          </button>
        </div>
      </header>

      <div className="container mt-5">
        {}
        {mostrarSaludo && (
          <div
            className="alert alert-primary text-center fw-semibold mb-4 shadow-sm fade-in"
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            ¡Bienvenido de nuevo, {nombreUsuario}!
          </div>
        )}

        {}
        <div className="mb-4 text-center">
          <label className="me-2 fw-semibold">Filtrar por categoría:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="form-select d-inline-block"
            style={{ width: "220px" }}
          >
            <option value="">Todas</option>
            {categorias.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <h2 id="productos" className="text-center mb-4">
          Nuestros Productos
        </h2>

        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((p) => (
              <div className="col-md-4 mb-4" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={p.imagen}
                    className="card-img-top"
                    alt={p.nombre}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.nombre}</h5>
                    <p className="card-text text-muted">{p.descripcion}</p>
                    <p className="fw-bold text-primary">
                      ${parseInt(p.precio).toLocaleString("es-CL")}
                    </p>

                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => agregarAlCarrito(p)}
                    >
                      🛒 Agregar al Carrito
                    </button>

                    <button
                      className="btn btn-success w-100"
                      onClick={() => navigate(`/detalle/${p.id}`)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
