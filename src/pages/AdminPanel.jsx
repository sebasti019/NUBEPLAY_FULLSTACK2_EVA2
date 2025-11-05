import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
    categoria: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const almacenados =
      JSON.parse(localStorage.getItem("productosAdmin")) || [];
    const categoriasGuardadas = JSON.parse(
      localStorage.getItem("categorias")
    ) || ["Celulares", "Audífonos", "Juegos"];
    setProductos(almacenados);
    setCategorias(categoriasGuardadas);
  }, []);

  useEffect(() => {
    const actualizarCategorias = () => {
      const guardadas =
        JSON.parse(localStorage.getItem("categorias")) || categorias;
      setCategorias(guardadas);
    };
    window.addEventListener("storage", actualizarCategorias);
    return () => window.removeEventListener("storage", actualizarCategorias);
  }, [categorias]);

  const guardarProductos = (lista) => {
    setProductos(lista);
    localStorage.setItem("productosAdmin", JSON.stringify(lista));
  };

  const agregarProducto = (e) => {
    e.preventDefault();
    if (
      !nuevo.nombre ||
      !nuevo.precio ||
      !nuevo.imagen ||
      !nuevo.descripcion ||
      !nuevo.categoria
    ) {
      return alert(" Completa todos los campos antes de continuar.");
    }

    if (editandoId) {
      const actualizados = productos.map((p) =>
        p.id === editandoId ? { ...nuevo, id: editandoId } : p
      );
      guardarProductos(actualizados);
      alert("Producto actualizado correctamente.");
      setEditandoId(null);
    } else {
      const producto = { ...nuevo, id: Date.now() };
      const actualizados = [...productos, producto];
      guardarProductos(actualizados);
      alert("Producto agregado correctamente.");
    }

    setNuevo({
      nombre: "",
      precio: "",
      imagen: "",
      descripcion: "",
      categoria: "",
    });
  };

  const eliminarProducto = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const filtrados = productos.filter((p) => p.id !== id);
      guardarProductos(filtrados);
    }
  };

  const editarProducto = (producto) => {
    setNuevo({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
    });
    setEditandoId(producto.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const agregarCategoria = () => {
    if (!nuevaCategoria.trim()) return alert("Ingresa un nombre válido.");
    if (categorias.includes(nuevaCategoria))
      return alert("Esa categoría ya existe.");

    const actualizadas = [...categorias, nuevaCategoria];
    setCategorias(actualizadas);
    localStorage.setItem("categorias", JSON.stringify(actualizadas));
    setNuevaCategoria("");
    alert("Categoría agregada correctamente.");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>

      {}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editandoId ? "Editar Producto" : "Agregar Producto"}</h5>
        <form onSubmit={agregarProducto} className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={nuevo.precio}
              onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="URL Imagen"
              value={nuevo.imagen}
              onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={nuevo.descripcion}
              onChange={(e) =>
                setNuevo({ ...nuevo, descripcion: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={nuevo.categoria}
              onChange={(e) =>
                setNuevo({ ...nuevo, categoria: e.target.value })
              }
            >
              <option value="">Categoría</option>
              {categorias.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-success w-100">
              {editandoId ? " Guardar Cambios" : " Añadir Producto"}
            </button>
            {editandoId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditandoId(null);
                  setNuevo({
                    nombre: "",
                    precio: "",
                    imagen: "",
                    descripcion: "",
                    categoria: "",
                  });
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Agregar Nueva Categoría</h5>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Consolas"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agregarCategoria}>
            Agregar
          </button>
        </div>
      </div>

      {}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagen} alt={p.nombre} width="60" />
                  </td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editarProducto(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
