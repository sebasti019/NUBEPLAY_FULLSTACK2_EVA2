import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CompraExitosa() {
  const [compra, setCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("ultimaCompra"));
    if (!datos) {
      navigate("/");
      return;
    }
    setCompra(datos);
  }, [navigate]);

  if (!compra) return null;

  const subtotal =
    compra.subtotal || compra.total / (1 - (compra.descuento || 0));
  const descuento = compra.descuento ? compra.descuento * 100 : 0;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card p-4 shadow-sm">
        <h2 className="text-center text-success mb-3"> ¡Compra Exitosa!</h2>
        <p className="text-center text-muted">
          Gracias por tu compra, <strong>{compra.usuario}</strong>.
        </p>

        <hr />

        <h5 className="text-primary"> Detalles de la Compra</h5>
        <p>
          <strong>Código:</strong> {compra.codigo}
        </p>
        <p>
          <strong>Fecha:</strong> {compra.fecha}
        </p>
        <p>
          <strong>Método de entrega:</strong>{" "}
          {compra.metodoEnvio === "retiro"
            ? "Retiro en tienda"
            : "Envío a domicilio"}
        </p>

        {compra.metodoEnvio === "domicilio" && (
          <>
            <p>
              <strong>Dirección:</strong> {compra.calle}, {compra.comuna},{" "}
              {compra.region}
            </p>
            <p>
              <strong>Teléfono:</strong> +56 {compra.telefono}
            </p>
          </>
        )}

        <hr />

        <h5 className="text-primary"> Productos Comprados</h5>
        <ul className="list-group mb-3">
          {compra.productos.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  width="50"
                  className="me-2 rounded"
                />
                {item.nombre} × {item.cantidad || 1}
              </div>
              <strong>
                ${(item.precio * (item.cantidad || 1)).toLocaleString("es-CL")}
              </strong>
            </li>
          ))}
        </ul>

        {}
        {descuento > 0 && (
          <p className="text-end text-primary">
            Descuento aplicado: <strong>{descuento}%</strong>
          </p>
        )}

        <h4 className="text-end text-success">
          Total: ${compra.total.toLocaleString("es-CL")}
        </h4>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-outline-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
