import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("storage"));
  };

  const cambiarCantidad = (id, delta) => {
    const nuevo = carrito.map((item) =>
      item.id === id
        ? { ...item, cantidad: Math.max(1, (item.cantidad || 1) + delta) }
        : item
    );
    actualizarCarrito(nuevo);
  };

  const eliminarProducto = (id) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    actualizarCarrito(nuevo);
  };

  const vaciarCarrito = () => {
    actualizarCarrito([]);
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  const irAlCheckout = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío ");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-muted">
          Tu carrito está vacío. ¡Agrega productos desde el inicio!
        </p>
      ) : (
        <>
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      width="70"
                      className="me-2 rounded"
                    />
                    <strong>{item.nombre}</strong>
                  </td>
                  <td>${item.precio.toLocaleString("es-CL")}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => cambiarCantidad(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => cambiarCantidad(item.id, +1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    $
                    {(item.precio * (item.cantidad || 1)).toLocaleString(
                      "es-CL"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4 className="fw-bold">Total: ${total.toLocaleString("es-CL")}</h4>
            <button
              className="btn btn-outline-danger me-2"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
            <button className="btn btn-success" onClick={irAlCheckout}>
              Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
  );
}
