import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [calle, setCalle] = useState("");
  const [metodoEnvio, setMetodoEnvio] = useState("retiro");
  const [mensaje, setMensaje] = useState("");

  const [cupon, setCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!usuarioActivo) {
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate("/login");
      return;
    }

    setUsuario(usuarioActivo);
    setCarrito(carritoGuardado);

    const perfil = JSON.parse(localStorage.getItem("perfilUsuario")) || null;
    if (perfil) {
      if (perfil.telefono) setTelefono(perfil.telefono);
      if (perfil.region) setRegion(perfil.region);
      if (perfil.comuna) setComuna(perfil.comuna);
      if (perfil.calle) setCalle(perfil.calle);
    }
  }, [navigate]);

  const totalBruto = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  const aplicarCupon = () => {
    const code = (cupon || "").trim().toUpperCase();
    if (!code) {
      setMensaje("Ingresa un código de cupón o deja el campo en blanco.");
      return;
    }
    if (code === "NUBEPLAYDTO") {
      setDescuentoAplicado(0.1);
      setMensaje(" Cupón aplicado: 10% de descuento.");
    } else {
      setDescuentoAplicado(0);
      setMensaje(" Cupón no válido.");
    }
  };

  const procesarCompra = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      setMensaje(" Tu carrito está vacío.");
      setTimeout(() => navigate("/compra-fallida"), 1500);
      return;
    }

    if (
      metodoEnvio === "domicilio" &&
      (!region || !comuna || !calle.trim() || !telefono.trim())
    ) {
      setMensaje(" Debes completar todos los datos de envío.");
      setTimeout(() => navigate("/compra-fallida"), 1500);
      return;
    }

    const codigoCompra =
      "NBP-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const subtotal = totalBruto;
    const descuento = descuentoAplicado || 0;
    const montoDescuento = Math.round(subtotal * descuento);
    const totalFinal = subtotal - montoDescuento;

    const resumenCompra = {
      codigo: codigoCompra,
      usuario: usuario.nombre,
      correo: usuario.correo,
      telefono,
      metodoEnvio,
      region,
      comuna,
      calle,
      productos: carrito,
      subtotal,
      descuento,
      descuentoMonto: montoDescuento,
      total: totalFinal,
      fecha: new Date().toLocaleString("es-CL"),
      cupon: cupon ? cupon.trim().toUpperCase() : null,
    };

    localStorage.setItem("ultimaCompra", JSON.stringify(resumenCompra));

    localStorage.removeItem("carrito");
    window.dispatchEvent(new Event("storage"));
    setMensaje(" Compra realizada con éxito. ¡Gracias por tu pedido!");
    setTimeout(() => navigate("/compra-exitosa"), 1200);
  };

  if (!usuario) return null;

  const regiones = [
    "Región Metropolitana",
    "Valparaíso",
    "Biobío",
    "Coquimbo",
    "Los Lagos",
  ];

  const comunasPorRegion = {
    "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Las Condes"],
    Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
    Biobío: ["Concepción", "Talcahuano", "Los Ángeles"],
    Coquimbo: ["La Serena", "Coquimbo", "Ovalle"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <h2 className="text-center mb-4"> Finalizar Compra</h2>

      <form onSubmit={procesarCompra} className="card p-4 shadow-sm">
        <h5 className="mb-3"> Datos del cliente</h5>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={usuario.nombre}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={usuario.correo}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 912345678"
            pattern="^[0-9]{9}$"
            required
          />
        </div>

        <h5 className="mt-4 mb-3">Datos de envío</h5>

        <div className="mb-3">
          <label className="form-label">Método de entrega</label>
          <select
            className="form-select"
            value={metodoEnvio}
            onChange={(e) => setMetodoEnvio(e.target.value)}
          >
            <option value="retiro">Retiro en tienda</option>
            <option value="domicilio">Envío a domicilio</option>
          </select>
        </div>

        {metodoEnvio === "domicilio" && (
          <>
            <div className="mb-3">
              <label className="form-label">Región</label>
              <select
                className="form-select"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna("");
                }}
              >
                <option value="">Selecciona una región</option>
                {regiones.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <select
                className="form-select"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
              >
                <option value="">
                  {region ? "Selecciona una comuna" : "Selecciona una región"}
                </option>
                {region &&
                  comunasPorRegion[region]?.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Calle y número</label>
              <input
                type="text"
                className="form-control"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                placeholder="Ej: Av. Los Pinos 1234, Depto 101"
                required
              />
            </div>
          </>
        )}

        {}
        <hr />
        <div className="mb-3">
          <label className="form-label">Código de descuento (opcional)</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
              placeholder='Ej: "NUBEPLAYDTO" (10%)'
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={aplicarCupon}
            >
              Aplicar
            </button>
          </div>
          {descuentoAplicado > 0 && (
            <div className="form-text text-success">
              Se aplicó {Math.round(descuentoAplicado * 100)}% de descuento.
            </div>
          )}
        </div>

        <h5 className="text-end">
          Subtotal: ${totalBruto.toLocaleString("es-CL")}
        </h5>
        {descuentoAplicado > 0 && (
          <h6 className="text-end text-primary">
            Descuento: -$
            {Math.round(totalBruto * descuentoAplicado).toLocaleString("es-CL")}
          </h6>
        )}

        <h4 className="text-end text-success">
          Total: $
          {Math.round(
            totalBruto - totalBruto * descuentoAplicado
          ).toLocaleString("es-CL")}
        </h4>

        {mensaje && (
          <p
            className={`text-center mt-3 ${
              mensaje.startsWith("✅") ? "text-success" : "text-danger"
            }`}
          >
            {mensaje}
          </p>
        )}

        <button type="submit" className="btn btn-success w-100 mt-3">
          Confirmar compra
        </button>
      </form>
    </div>
  );
}
