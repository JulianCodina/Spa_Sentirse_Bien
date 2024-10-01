import { useLayoutEffect, useState } from "react";
import "./Perfil.css";
import React from "react";
import Dropdown from "../components/Dropdown";

type Perfil = {
  FullName: string;
  email: string;
  img?: string;
  password: string;
  registro: Date;
  reservas: number;
};
const perfil: Perfil = {
  FullName: "Julian Codina",
  email: "depedrojulianismael@gmail.com",
  password: "StarWars1234",
  registro: new Date("07-09-24"),
  reservas: 3,
};

const defaultImage = "src/assets/perfil.jpg";

export default function Perfil() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [image, setImage] = useState<string | undefined>(perfil.img);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Actualiza el estado con la imagen cargada
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  };

  const registroFecha = perfil.registro;
  const registroString = `${registroFecha.getDate()}/${
    registroFecha.getMonth() + 1
  }/${registroFecha.getFullYear()}`;

  return (
    <div className="perfil-page">
      <div className="background-image" />
      <div className="perfil-container">
        <div className="titulo">
          <h1>PERFIL</h1>
          <hr />
        </div>
        <div className="section-container">
          <div className="perfil-section">
            <h3>Mi perfil</h3>
            <div className="tarjetaPerfil">
              <h2>{perfil.FullName}</h2>
              <p>{perfil.email}</p>
              <img src={image ? image : defaultImage} alt="Foto" />
              <div className="button">
                <label htmlFor="file-upload" className="MainButton">
                  Cambiar Foto
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <p>Miembro desde: {registroString}</p>
              <p>Reservas: {perfil.reservas}</p>
            </div>
          </div>

          <div className="perfil-section">
            <h3>Editar perfil</h3>
            <div className="tarjetaPerfil">
              <form>
                <div className="par">
                  <input
                    className="textbox"
                    type="text"
                    name="FullName"
                    placeholder="Nombre Completo"
                  ></input>
                  <input
                    className="textbox"
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                  ></input>
                </div>
                <div className="par">
                  <input
                    className="textbox"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                  />

                  <input
                    className="textbox"
                    type="password"
                    name="password2"
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <div className="par">
                  <Dropdown
                    label={"Genero"}
                    options={["Hombre", "Mujer", "Otro"]}
                  />
                  <input
                    className="textbox"
                    type="text"
                    name="text"
                    placeholder="Número de Telefonno"
                  />
                </div>
                <p className="MensajeError">* Correo ya en uso.</p>
                <button className="MainButton" type="submit">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
