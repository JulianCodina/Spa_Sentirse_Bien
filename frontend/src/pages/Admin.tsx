import { ChangeEvent, useLayoutEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import "./Admin.css";

const servicios: string[] = [
  "Antiestres",
  "Descontracturantes",
  "Con piedras calientes",
  "Circulatorios",
];
const horas: string[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
const tipos: string[] = [
  "Masaje",
  "Belleza",
  "Tratamientos Faciales",
  "Tratamientos Corporales",
];

type Media = {
  img: string;
  titulo?: string;
  texto?: string;
};
const news: Media[] = [
  {
    img: "src/assets/noticia1.jpeg",
    titulo: "Titulo noticia 1",
    texto: "Prueba noticia 1",
  },
  {
    img: "src/assets/noticia1.jpeg",
    titulo: "Titulo noticia 2",
    texto:
      "Prueba noticia 2 Prueba noticia 2 Prueba noticia 2 Prueba noticia 2 Prueba noticia 2",
  },
  {
    img: "src/assets/noticia1.jpeg",
    titulo: "Titulo noticia 2",
    texto:
      "Prueba noticia 2 Prueba noticia 2 Prueba noticia 2 Prueba noticia 2 Prueba noticia 2",
  },
];
const photos: Media[] = [
  {
    img: "src/assets/masaje-antiestres.jpg",
  },
  {
    img: "src/assets/temp.png",
  },
  {
    img: "src/assets/Dermohealth.jpg",
  },
  {
    img: "src/assets/masaje-antiestres.jpg",
  },
  {
    img: "src/assets/temp.png",
  },
  {
    img: "src/assets/Dermohealth.jpg",
  },
];

type Turno = {
  usuario: string;
  servicio: string;
  tipo: string;
  hora: string;
};
const turnos: Turno[] = [
  {
    usuario: "JuanPerez",
    servicio: "Antiestres",
    tipo: "Masaje",
    hora: "13:00",
  },
  {
    usuario: "TomasMassa",
    servicio: "Descontracturante",
    tipo: "Masaje",
    hora: "13:00",
  },
  {
    usuario: "LuisAlCuadrado",
    servicio: "Circulatorios",
    tipo: "Masaje",
    hora: "13:00",
  },
  {
    usuario: "PaulaLondra",
    servicio: "Lifting de pestaña",
    tipo: "Belleza",
    hora: "13:00",
  },
  {
    usuario: "LucasGerbert",
    servicio: "Limpieza Profunda + Hidratación",
    tipo: "Tratamientos Faciales",
    hora: "13:00",
  },
  {
    usuario: "PabloDias",
    servicio: "DermoHealth",
    tipo: "Tratamientos Corporales",
    hora: "13:00",
  },
];

export default function Admin() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [titulo, setTitulo] = useState("");
  const [text, setText] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name === "titulo") {
      setTitulo(value);
    } else if (name === "text") {
      setText(value);
    }
  }

  return (
    <div className="admin-page">
      <div className="background-image" />
      <div className="admin-container">
        <div className="titulo">
          <h1>ADMINISTRADOR</h1>
          <hr />
        </div>
        <div className="admin-types">
          <div className="gallery-section">
            <h3>Noticias</h3>
            <div className="element-container">
              {news.map((element, index) => (
                <div className="element" key={index}>
                  <div>
                    <img src={element.img} />
                    <div className="text"></div>
                    <h4>{element.titulo}</h4>
                    <p>{element.texto}</p>
                  </div>
                  <button className="delete">Borrar</button>
                </div>
              ))}
            </div>
            <div className="buttons">
              <div className="par">
                <input
                  className="textbox"
                  name="titulo"
                  type="text"
                  value={titulo}
                  onChange={handleChange}
                  placeholder="Título"
                />
                <input
                  className="textbox"
                  name="text"
                  type="text"
                  value={text}
                  onChange={handleChange}
                  placeholder="Descripción"
                />
              </div>
              <div className="par">
                <div className="file">
                  <label htmlFor="file-upload" className="SecondButton">
                    Subir imagen
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <input className="MainButton" type="submit" value="Guardar" />
              </div>
            </div>
          </div>
          <div className="gallery-section">
            <h3>Fotos</h3>
            <div className="element-container">
              {photos.map((element, index) => (
                <div className="element-photo">
                  <div className="element-img" key={index}>
                    <img src={element.img} />
                  </div>
                  <button className="delete">Borrar</button>
                </div>
              ))}
            </div>
            <div className="buttons">
              <div className="file">
                <label htmlFor="file-upload" className="SecondButton">
                  Seleccionar imagen
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
              <input className="MainButton" type="submit" value="Guardar" />
            </div>
          </div>
          <div className="services-section">
            <h3>Servicios</h3>
            <div className="buttons">
              <div className="par">
                <Dropdown
                  label="Tipo"
                  options={[
                    "Masajes",
                    "Belleza",
                    "Tratamientos Faciales",
                    "Tratamientos Corporales",
                  ]}
                />
                <Dropdown label="Servicio" options={servicios} />
              </div>
              <div className="par">
                <input type="text" className="textbox" placeholder="precio" />
                <input type="submit" className="MainButton" value="Guardar" />
              </div>
            </div>
          </div>
          <div className="hours-section">
            <h3>Horarios</h3>
            <div className="buttons">
              <div className="par">
                <Dropdown label="Horarios" options={horas} />
                <input
                  type="text"
                  className="textbox"
                  placeholder="Agregar hora"
                />
              </div>
              <div className="par">
                <input type="submit" className="MainButton" value="Guardar" />
                <input type="submit" className="SecondButton" value="Borrar" />
              </div>
            </div>
          </div>
          <div className="turns-section">
            <h3>Turnos</h3>
            <div className="buttons">
              <div className="par">
                <input type="date" />
                <Dropdown label="Tipo" options={tipos} />
              </div>
            </div>
            <div className="Turnos-container">
              {turnos.map((turn, index) => (
                <div className="turno" key={index}>
                  <h4>{turn.servicio}</h4>
                  <p>{turn.tipo}</p>
                  <p>{turn.hora}</p>
                  <strong>{turn.usuario}</strong>
                  <input
                    type="submit"
                    className="SecondButton"
                    value="Eliminar"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
