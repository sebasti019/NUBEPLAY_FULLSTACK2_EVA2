import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logoNUBEPLAY.jpeg";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const validarCorreo = (correo) => {
    const regex =
      /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !password || !confirmar) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje(
        "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmar) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find((u) => u.correo === correo);
    if (existe) {
      setMensaje("Este correo ya está registrado. Intenta iniciar sesión.");
      return;
    }

    const nuevoUsuario = { nombre, correo, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje(" Registro exitoso. Redirigiendo al inicio de sesión...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      {}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo de NUBEPLAY"
          style={{
            width: "140px",
            height: "auto",
            marginBottom: "10px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      <h2 className="text-center mb-4">Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
            placeholder="Ej: Sebastián García"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            autoComplete="email"
            placeholder="ejemplo@duoc.cl"
          />
          <div className="form-text">
            Se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmar" className="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmar"
            className="form-control"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {mensaje && (
          <p
            className={`text-center ${
              mensaje.startsWith("✅") ? "text-success" : "text-danger"
            }`}
          >
            {mensaje}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Registrarse
        </button>
      </form>

      <p className="text-center mt-3">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
}
