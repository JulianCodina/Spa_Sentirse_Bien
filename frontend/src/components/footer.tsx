import React, { useState, useRef } from "react";
import "./footer.css";
import GoogleMap from "./googleMap";
import emailjs from "@emailjs/browser";

export default function Footer() {
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null); // Referencia al formulario

  // Maneja la selección del archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    // Verifica si formRef está disponible y envía el formulario
    if (formRef.current) {
      emailjs
        .sendForm(
          "service_tm8ntjv", // Reemplazar con tu Service ID
          "template_ssqskz4", // Reemplazar con tu Template ID
          formRef.current, // Referencia al formulario completo
          "vpN5u16jjxNL3dRm1" // Reemplazar con tu Public Key
        )
        .then(
          (response) => {
            console.log(
              "Correo enviado exitosamente",
              response.status,
              response.text
            );
            alert("Archivo enviado exitosamente.");
          },
          (err) => {
            console.error("Error al enviar el archivo", err);
            alert("El archivo debe pesar menos de 50kbs");
          }
        );
    }
  };

  return (
    <div className="footer" id="contact">
      <div className="contact">
        <div className="par">
          <div className="contactInfo">
            <h3>CONTÁCTANOS</h3>
            <div className="item">
              <img src="/src/assets/ubicacion.png" alt="Ubicacion" />
              <p>ANJ, Saavedra 449, H3500 Resistencia, Provincia del Chaco</p>
            </div>
            <div className="item">
              <img src="/src/assets/gmail.png" alt="Gmail" />
              <p>correoelectronico@email.com</p>
            </div>
            <div className="item">
              <img src="/src/assets/whatsapp.png" alt="Whatsapp" />
              <p>+54 3624242424</p>
            </div>
            <div className="item">
              <img src="/src/assets/facebook.png" alt="facebook" />
              <p>@Sentirse.bien</p>
            </div>
          </div>
          <GoogleMap />
        </div>
        <div className="par">
          <div className="itemEmpleo">
            <h3>EMPLEO</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="archivo">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  name="file" // Necesario para enviar el archivo
                />
                <input className="submit" type="submit" value="Enviar CV" />
              </div>
            </form>
          </div>
          <div className="itemEmpleo">
            <h3>DESARROLLADORES</h3>
            <a href="https://github.com/JulianCodina">Julian Codina</a>
            <br />
            <a href="https://github.com/AstridV23">Astrid Viñuela</a>
            <br />
            <a href="https://github.com/exequielcabrera98">Exequiel Cabrera</a>
          </div>
        </div>
      </div>
    </div>
  );
}
