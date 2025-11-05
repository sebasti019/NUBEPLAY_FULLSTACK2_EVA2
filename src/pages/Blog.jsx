import React, { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Blog() {
  useEffect(() => {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((button) => {
      const targetId = button.getAttribute("data-bs-target");
      const target = document.querySelector(targetId);

      if (target) {
        target.addEventListener("show.bs.collapse", () => {
          button.textContent = "Ocultar noticia";
        });

        target.addEventListener("hide.bs.collapse", () => {
          button.textContent = "Ver noticia";
        });
      }
    });
  }, []);

  return (
    <main className="container my-5">
      <h2 className="text-center mb-4"> Noticias y Actualidad</h2>

      {/* Noticia 1 */}
      <article className="mb-5">
        <h3>PlayStation revoluciona con su nueva consola</h3>
        <img
          src="/assets/imagenes/ps5.webp"
          className="img-fluid rounded mb-3"
          alt="Nueva consola PlayStation"
        />
        <p>
          Sony sorprendió al mundo gamer con el anuncio de su nueva consola en
          2025, prometiendo gráficos hiperrealistas, menor consumo energético y
          retrocompatibilidad completa.
        </p>
        <p className="collapse" id="noticia1">
          Además, contará con un ecosistema renovado de realidad virtual y una
          integración total con servicios en la nube, lo que permitirá a los
          jugadores acceder a sus títulos desde cualquier dispositivo conectado.
          También se espera que incluya un control con respuesta háptica
          mejorada, sensores biométricos y compatibilidad con experiencias
          multijugador más inmersivas.
        </p>
        <button
          className="btn btn-primary toggle-btn"
          data-bs-toggle="collapse"
          data-bs-target="#noticia1"
        >
          Ver noticia
        </button>
        <hr />
      </article>

      {/* Noticia 2 */}
      <article className="mb-5">
        <h3>Tendencias en Smartphones 2025</h3>
        <img
          src="/assets/imagenes/smarphone.webp"
          className="img-fluid rounded mb-3"
          alt="Smartphones 2025"
        />
        <p>
          El mercado de los smartphones sigue evolucionando rápidamente. Para
          2025, las principales tendencias incluyen pantallas flexibles
          mejoradas, baterías de carga ultra rápida y la integración de
          inteligencia artificial avanzada para personalizar la experiencia del
          usuario.
        </p>
        <p className="collapse" id="noticia2">
          Además, los dispositivos plegables estarán cada vez más presentes, y
          los fabricantes apuestan por cámaras con calidad profesional y nuevas
          funciones de conectividad 6G. Otro punto fuerte es la seguridad: los
          smartphones vendrán con sensores biométricos más precisos y sistemas
          de autenticación mediante IA.
        </p>
        <button
          className="btn btn-primary toggle-btn"
          data-bs-toggle="collapse"
          data-bs-target="#noticia2"
        >
          Ver noticia
        </button>
        <hr />
      </article>

      {/* Noticia 3 */}
      <article className="mb-5">
        <h3>Apple presenta el revolucionario iPhone 17</h3>
        <img
          src="/assets/imagenes/iphone17.jpg"
          className="img-fluid rounded mb-3"
          alt="iPhone 17"
        />
        <p>
          Apple presentó oficialmente el iPhone 17, un dispositivo que promete
          cambiar la forma en que interactuamos con la tecnología móvil gracias
          a su innovador diseño y potentes características.
        </p>
        <p className="collapse" id="noticia3">
          El iPhone 17 incorpora un procesador A19 Bionic de última generación,
          con un rendimiento hasta un 40% superior al de su antecesor. Su
          pantalla OLED 8K con tecnología ProMotion 240Hz ofrece una experiencia
          visual sin precedentes, acompañada de una cámara principal de 200MP
          con capacidad para grabar en 12K. Además, incluye carga inalámbrica a
          distancia y una batería que dura hasta 3 días de uso intensivo.
        </p>
        <button
          className="btn btn-primary toggle-btn"
          data-bs-toggle="collapse"
          data-bs-target="#noticia3"
        >
          Ver noticia
        </button>
        <hr />
      </article>
    </main>
  );
}
