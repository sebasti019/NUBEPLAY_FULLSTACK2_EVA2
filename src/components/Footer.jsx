import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1 fw-bold">NUBEPLAY - Tu tienda gamer favorita</p>
        <p className="mb-2">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <a
            href="#"
            className="text-light text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook"></i> Facebook
          </a>
          <a
            href="#"
            className="text-light text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram"></i> Instagram
          </a>
          <a
            href="#"
            className="text-light text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter-x"></i> Twitter
          </a>
        </div>

        <hr className="border-secondary my-3" />
        <small className="text-secondary">
          Desarrollado por el equipo NUBEPLAY
        </small>
      </div>
    </footer>
  );
}
