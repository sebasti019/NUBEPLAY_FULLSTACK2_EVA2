import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    alert("Debes iniciar sesión para acceder a esta sección.");
    return <Navigate to="/login" replace />;
  }

  if (usuarioActivo.rol !== "Administrador") {
    alert("Acceso denegado. Solo administradores pueden entrar aquí.");
    return <Navigate to="/" replace />;
  }

  return children;
}
