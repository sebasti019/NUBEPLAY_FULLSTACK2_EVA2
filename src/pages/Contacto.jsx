import React, { useState } from "react";
import "../style.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const nuevosErrores = {};
    const correoValido =
      /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!formData.nombre.trim() || formData.nombre.length > 100)
      nuevosErrores.nombre = "Ingresa tu nombre (máx. 100 caracteres).";
    if (!correoValido.test(formData.correo))
      nuevosErrores.correo =
        "Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if (!formData.mensaje.trim() || formData.mensaje.length > 500)
      nuevosErrores.mensaje =
        "El mensaje es obligatorio (máx. 500 caracteres).";

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log(" Datos enviados:", formData);
      setEnviado(true);
      setFormData({ nombre: "", correo: "", mensaje: "" });
      setTimeout(() => setEnviado(false), 3000);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Contáctanos</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className="card shadow-lg p-4 border-0" onSubmit={manejarEnvio}>
            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Tu nombre completo"
                maxLength="100"
                required
              />
              {errors.nombre && (
                <div className="invalid-feedback">{errors.nombre}</div>
              )}
            </div>

            {}
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-control ${errors.correo ? "is-invalid" : ""}`}
                value={formData.correo}
                onChange={(e) =>
                  setFormData({ ...formData, correo: e.target.value })
                }
                placeholder="ejemplo@gmail.com"
                maxLength="100"
                required
              />
              {errors.correo && (
                <div className="invalid-feedback">{errors.correo}</div>
              )}
            </div>

            {}
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
                rows="4"
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                placeholder="Escribe tu mensaje aquí..."
                maxLength="500"
                required
              ></textarea>
              {errors.mensaje && (
                <div className="invalid-feedback">{errors.mensaje}</div>
              )}
            </div>

            {}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Enviar mensaje
              </button>
            </div>

            {enviado && (
              <div className="alert alert-success mt-3 text-center">
                ¡Tu mensaje fue enviado con éxito!
              </div>
            )}
          </form>
        </div>
      </div>

      {}
      <section className="text-center mt-5">
        <h4 className="fw-bold text-primary mb-3">Síguenos en redes</h4>
        <div className="d-flex justify-content-center gap-4 fs-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark social-icon"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark social-icon"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark social-icon"
          >
            <i className="bi bi-twitter-x"></i>
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark social-icon"
          >
            <i className="bi bi-tiktok"></i>
          </a>
        </div>
      </section>
    </div>
  );
}
