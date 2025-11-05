import React, { useState, useEffect } from "react";

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categorias")) || [
      "Celulares",
      "Audífonos",
      "Juegos",
    ];
    setCategorias(guardadas);
  }, []);

  const guardarCategorias = (nuevas) => {
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nombre = nuevaCategoria.trim();
    if (!nombre) return alert("El nombre no puede estar vacío");

    if (modoEdicion) {
      const actualizadas = [...categorias];
      actualizadas[indiceEditar] = nombre;
      guardarCategorias(actualizadas);
      setModoEdicion(false);
      setIndiceEditar(null);
    } else {
      if (categorias.includes(nombre)) return alert("Esa categoría ya existe");
      guardarCategorias([...categorias, nombre]);
    }

    setNuevaCategoria("");
  };

  const eliminarCategoria = (index) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${categorias[index]}"?`)) {
      const actualizadas = categorias.filter((_, i) => i !== index);
      guardarCategorias(actualizadas);
    }
  };

  const editarCategoria = (index) => {
    setNuevaCategoria(categorias[index]);
    setModoEdicion(true);
    setIndiceEditar(index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Administrar Categorías</h2>

      <form
        onSubmit={manejarSubmit}
        className="d-flex justify-content-center gap-2 mb-4"
      >
        <input
          type="text"
          className="form-control w-50"
          placeholder="Nueva categoría"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          {modoEdicion ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="table table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat, index) => (
            <tr key={index}>
              <td>{cat}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarCategoria(index)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarCategoria(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
