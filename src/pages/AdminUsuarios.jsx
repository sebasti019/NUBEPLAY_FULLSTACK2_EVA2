import React, { useState, useEffect } from "react";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "Cliente",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(guardados);
  }, []);

  const guardarUsuarios = (lista) => {
    setUsuarios(lista);
    localStorage.setItem("usuarios", JSON.stringify(lista));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nuevo.nombre || !nuevo.correo || !nuevo.password) {
      return alert(" Todos los campos son obligatorios.");
    }

    const regexCorreo =
      /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regexCorreo.test(nuevo.correo)) {
      return alert(
        " Correo no válido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com"
      );
    }

    if (modoEdicion) {
      const actualizados = [...usuarios];
      actualizados[indiceEditar] = nuevo;
      guardarUsuarios(actualizados);
      setModoEdicion(false);
      setIndiceEditar(null);
    } else {
      
      if (usuarios.some((u) => u.correo === nuevo.correo)) {
        return alert(" Ya existe un usuario con ese correo.");
      }
      guardarUsuarios([...usuarios, nuevo]);
    }

    setNuevo({ nombre: "", correo: "", password: "", rol: "Cliente" });
    alert(" Usuario guardado correctamente.");
  };

  const editarUsuario = (index) => {
    setNuevo(usuarios[index]);
    setModoEdicion(true);
    setIndiceEditar(index);
  };

  const eliminarUsuario = (index) => {
    if (
      window.confirm(
        `¿Seguro que deseas eliminar a "${usuarios[index].nombre}"?`
      )
    ) {
      const actualizados = usuarios.filter((_, i) => i !== index);
      guardarUsuarios(actualizados);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administración - Usuarios</h2>

      {}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>{modoEdicion ? "Editar Usuario" : "Agregar Usuario"}</h5>
        <form onSubmit={manejarSubmit} className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              value={nuevo.correo}
              onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={nuevo.password}
              onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={nuevo.rol}
              onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success">
              {modoEdicion ? "Actualizar Usuario" : "Añadir Usuario"}
            </button>
          </div>
        </form>
      </div>

      {}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u, i) => (
                <tr key={i}>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editarUsuario(i)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarUsuario(i)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
