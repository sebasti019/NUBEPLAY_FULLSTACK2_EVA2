import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { agregarAlCarrito } from "../utils/carrito";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(0);

  useEffect(() => {
    const productosAdmin =
      JSON.parse(localStorage.getItem("productosAdmin")) || [];

    const encontrado = productosAdmin.find((p) => p.id === parseInt(id));
    setProducto(encontrado);

    const guardadas = JSON.parse(localStorage.getItem(`reseñas_${id}`)) || [];
    setReseñas(guardadas);
  }, [id]);

  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado </h2>;
  }

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(producto);
  };

  const enviarReseña = (e) => {
    e.preventDefault();
    if (!nombre || !comentario || estrellas === 0) {
      alert("Completa todos los campos y selecciona una calificación ⭐");
      return;
    }

    const nuevaReseña = { nombre, comentario, estrellas };
    const nuevas = [...reseñas, nuevaReseña];
    setReseñas(nuevas);
    localStorage.setItem(`reseñas_${id}`, JSON.stringify(nuevas));

    setNombre("");
    setComentario("");
    setEstrellas(0);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {}
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <h4 className="text-primary fw-bold">
            ${parseInt(producto.precio).toLocaleString("es-CL")}
          </h4>

          <div className="d-flex align-items-center gap-2 my-3">
            <label className="form-label mb-0">Cantidad:</label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              className="form-control w-25"
            />
          </div>

          <button className="btn btn-success" onClick={handleAgregar}>
            🛒 Añadir al carrito
          </button>
        </div>
      </div>

      {}
      <hr className="my-5" />
      <h4>Opiniones de usuarios</h4>

      <form onSubmit={enviarReseña} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Tu opinión"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setEstrellas(n)}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: n <= estrellas ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Reseña
        </button>
      </form>

      {reseñas.length === 0 ? (
        <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
      ) : (
        reseñas.map((r, i) => (
          <div key={i} className="border p-3 mb-3 rounded bg-light">
            <h6>
              {r.nombre} - {"★".repeat(r.estrellas)}
              {"☆".repeat(5 - r.estrellas)}
            </h6>
            <p>{r.comentario}</p>
          </div>
        ))
      )}
    </div>
  );
}
