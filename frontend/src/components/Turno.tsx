import Dropdown from "../components/Dropdown";
import { usePopUp } from "../components/PopUpContext";
import { useState } from "react";
import "./Turno.css";
import swal from "sweetalert";

const servicios: { nombre: string; precio: number }[] = [
  { nombre: "Antiestres", precio: 5000 },
  { nombre: "Descontracturantes", precio: 6000 },
  { nombre: "Con piedras calientes", precio: 7000 },
  { nombre: "Circulatorios", precio: 5500 },
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

type Props = {
  titulo: string;
  label: string;
  options: string[];
  onChange?: (value: string) => void;
};
function Box(props: Props) {
  const { titulo, label, options, onChange } = props; // Asegúrate de incluir onChange aquí
  return (
    <div className="box">
      <h4>{titulo}</h4>
      <Dropdown label={label} options={options} onChange={onChange} />{" "}
      {/* Asegúrate de pasar onChange aquí */}
    </div>
  );
}

export function TurnPopUp() {
  const { activePopUp, closePopUp } = usePopUp();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tipoTratamiento: "",
    servicio: "",
    fecha: "",
    hora: "",
    informacion: "",
  });

  // Estado para almacenar el precio
  const [precio, setPrecio] = useState<number>(0);

  if (activePopUp !== "turn") return null;

  // Maneja el cambio en los campos del formulario
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Si se cambia el servicio, actualiza el precio
    if (name === "servicio") {
      const selectedService = servicios.find((serv) => serv.nombre === value);
      if (selectedService) {
        setPrecio(selectedService.precio);
      } else {
        setPrecio(0);
      }
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página
    const { tipoTratamiento, servicio, fecha, hora, informacion } = formData;

    // Validación de campos obligatorios
    if (!tipoTratamiento || !servicio || !fecha || !hora) {
      swal({
        title: "Campos vacios",
        text: "Ingrese toda la información solicitada",
        icon: "warning",
        timer: 2500,
      });
      return; // Detiene la ejecución si hay campos vacíos
    } else {
      // Crear el string con la información
      const turnoString = `Turno reservado: ${tipoTratamiento}, Servicio: ${servicio}, Fecha: ${fecha}, Hora: ${hora}, Información: ${informacion}, Precio: $${precio}`;

      // Mostrar el string en la consola
      console.log(turnoString);
      swal({
        title: "Turno agendado 👍",
        icon: "success",
        timer: 2500,
      });

      // Limpiar los campos del formulario
      setFormData({
        tipoTratamiento: "",
        servicio: "",
        fecha: "",
        hora: "",
        informacion: "",
      });
      setPrecio(0);
    }
  };

  return (
    <div className="turno-component">
      <div className="popup-overlay">
        <div className="turno-component-content">
          <form onSubmit={handleSubmit}>
            <div className="icon">
              <img src="../assets/calendario.png" />
              <h1>AGENDÁ TU TURNO</h1>
            </div>
            <p>Completa el siguiente formulario para reservar tu turno.</p>
            <hr />
            <h2>Reserva</h2>
            <div className="Contenedor-dropdowns">
              <div className="par">
                <Box
                  titulo="Tipo de Tratamiento"
                  label="Seleccione"
                  options={["Masajes", "Belleza", "Faciales", "Corporales"]}
                  onChange={(selectedOption) =>
                    handleChange("tipoTratamiento", selectedOption)
                  }
                />
                <Box
                  titulo="Servicio"
                  label="Seleccione"
                  options={servicios.map((servicio) => servicio.nombre)}
                  onChange={(selectedOption) =>
                    handleChange("servicio", selectedOption)
                  }
                />
              </div>
              <div className="par">
                <div className="box">
                  <h4>
                    Fecha <span className="required"></span>
                  </h4>
                  <input
                    type="date"
                    name="fecha"
                    id="fecha"
                    placeholder="Ingresar Fecha"
                    onChange={(e) => handleChange("fecha", e.target.value)}
                  />
                </div>
                <Box
                  titulo="Hora"
                  label="Seleccione"
                  options={horas}
                  onChange={(selectedOption) =>
                    handleChange("hora", selectedOption)
                  }
                />
              </div>
            </div>
            <div className="detalles">
              <h4>Información importante</h4>
              <textarea
                className="textbox"
                name="informacion"
                id="informacion"
                placeholder="Escriba brevemente información que deberá ser considerada por los empleados"
                onChange={(e) => handleChange("informacion", e.target.value)} // Asegúrate de que esto es correcto
              />
            </div>
            <h2>Precio: ${precio}</h2> {/* Muestra el precio actualizado */}
            <div className="buttons">
              <button type="submit" className="MainButton">
                Agendar
              </button>
              <button className="SecondButton" onClick={closePopUp}>
                Cancelar
              </button>
            </div>
            <p className="pagos">
              La transacción se realiza de forma presencial. Aceptamos como
              método de pago: efectivo, transferencia, débito y credito.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
