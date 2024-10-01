import Dropdown from "../components/Dropdown";
import { usePopUp } from "../components/PopUpContext";
import "./Turno.css";

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

type Props = {
  titulo: string;
  label: string;
  options: string[];
};
function Box(props: Props) {
  const { titulo, label, options } = props;
  return (
    <div className="box">
      <h4>{titulo}</h4>
      <Dropdown label={label} options={options} />
    </div>
  );
}

export function TurnPopUp() {
  const { activePopUp, closePopUp } = usePopUp();

  if (activePopUp !== "turn") return null;

  return (
    <div className="turno-component">
      <div className="popup-overlay">
        <div className="turno-component-content">
          <form>
            <div className="icon">
              <img src="./src/assets/calendario.png" />
              <h1>AGENDÁ TU TURNO</h1>
            </div>
            <p>Completa el siguiente formulario para reservar tu turno.</p>
            <hr />
            <h2>Reserva</h2>
            <div className="Contenedor-dropdowns">
              <Box
                titulo="Tipo de Tratamiento"
                label="Seleccione Tratamiento"
                options={[
                  "Masajes",
                  "Belleza",
                  "Tratamientos Faciales",
                  "Tratamientos Corporales",
                ]}
              />
              <Box
                titulo="Servicio"
                label="Seleccione Servicio"
                options={servicios}
              />
              <div className="box">
                <h4>Fecha</h4>
                <input
                  type="date"
                  name="fecha"
                  id="fecha"
                  placeholder="Ingresar Fecha"
                />
              </div>
              <Box titulo="Hora" label="Seleccione Horario" options={horas} />
            </div>
            <div className="detalles">
              <h4>Información importante</h4>
              <textarea
                className="textbox"
                name="informacion"
                id="informacion"
                placeholder="Escriba brevemente información que debera ser considerada por los empleados"
              />
            </div>
            <h2>Precio: $5000</h2>
            <div className="buttons">
              <button className="MainButton">Agendar</button>
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
