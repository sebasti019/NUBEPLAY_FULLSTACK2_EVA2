import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import AdminCategorias from "./pages/AdminCategorias";
import AdminUsuarios from "./pages/AdminUsuarios";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";

export default function App() {
  useEffect(() => {
    
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeAdmin = usuarios.find((u) => u.correo === "admin@admin.com");

    if (!existeAdmin) {
      const admin = {
        nombre: "Administrador",
        correo: "admin@admin.com",
        password: "admin1",
        rol: "Administrador",
      };
      usuarios.push(admin);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("Usuario administrador creado automáticamente");
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-categorias"
            element={
              <PrivateRoute>
                <AdminCategorias />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-usuarios"
            element={
              <PrivateRoute>
                <AdminUsuarios />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
