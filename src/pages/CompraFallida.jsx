import React from "react";
import { Link } from "react-router-dom";

export default function CompraFallida() {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-danger mb-4">Error en la compra</h2>
      <p>
        Ocurrió un problema al procesar tu pedido. Por favor revisa tus datos o
        intenta nuevamente más tarde.
      </p>
      <div className="mt-4">
        <Link to="/carrito" className="btn btn-outline-danger me-3">
          Volver al carrito 🛒
        </Link>
        <Link to="/" className="btn btn-primary">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
