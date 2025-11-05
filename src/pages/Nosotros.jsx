import React from "react";
import "../style.css";

export default function Nosotros() {
  return (
    <div className="container my-5">
      {/* Quiénes somos */}
      <section className="mb-5 text-center">
        <h2 className="mb-4 fw-bold text-primary">¿Quiénes Somos?</h2>
        <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
          <strong>NUBEPLAY</strong> es una tienda online dedicada a ofrecer lo
          mejor en videojuegos, consolas y productos tecnológicos. Nuestro
          objetivo es acercar la innovación a nuestros clientes con precios
          accesibles y un servicio de excelencia.
        </p>
      </section>

      {}
      <section className="row text-center mb-5 g-4">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h3 className="card-title text-success fw-bold mb-3">Misión</h3>
              <p className="card-text">
                Proporcionar productos tecnológicos de última generación,
                asegurando calidad, confianza y la mejor experiencia de compra
                online.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h3 className="card-title text-success fw-bold mb-3">Visión</h3>
              <p className="card-text">
                Convertirnos en la tienda online líder en tecnología y
                videojuegos en Latinoamérica, siendo reconocidos por nuestra
                innovación y cercanía con los clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="text-center">
        <h2 className="mb-4 fw-bold text-primary">Nuestro Equipo</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg border-0 h-100 equipo-card">
              <img
                src="https://via.placeholder.com/400x300.png?text=Sebastián+García"
                className="card-img-top"
                alt="Sebastián García"
              />
              <div className="card-body">
                <h5 className="card-title">Sebastián García</h5>
                <p className="card-text mb-1">Desarrollador Full Stack</p>
                <p className="card-text text-muted">Diseñador UX/UI</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
