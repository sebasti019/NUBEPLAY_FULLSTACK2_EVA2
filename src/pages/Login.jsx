import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logoNUBEPLAY.jpeg";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const validarCorreo = (correo) => {
    const regex =
      /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correo === "admin@admin.com" && password === "admin1") {
      const adminUser = {
        nombre: "Administrador",
        correo: "admin@admin.com",
        rol: "Administrador",
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(adminUser));
      window.dispatchEvent(new Event("userChanged"));
      alert(" Bienvenido Administrador");
      navigate("/admin");
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje(
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.dispatchEvent(new Event("userChanged"));
      console.log(" Usuario activo guardado:", usuario);

      if (usuario.rol === "Administrador") {
        setMensaje(" Bienvenido Administrador. Redirigiendo al panel...");
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        setMensaje(" Inicio de sesión exitoso. Redirigiendo...");
        setTimeout(() => navigate("/"), 1500);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
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

      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
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
            placeholder="tu_correo@duoc.cl"
          />
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
            autoComplete="current-password"
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

        <button type="submit" className="btn btn-success w-100 mt-3">
          Iniciar Sesión
        </button>
      </form>

      <p className="text-center mt-3">
        ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
      </p>
    </div>
  );
}
