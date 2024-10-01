import { useLayoutEffect } from "react";
import "./Turns.css";
import { TurnPopUp } from "../components/Turno";
import { usePopUp } from "../components/PopUpContext";

type Turno = {
  servicio: string;
  tipo: string;
  dia: string;
  hora: string;
};
const misTurnos: Turno[] = [
  {
    servicio: "Antiestres",
    tipo: "Masaje",
    dia: "04/06/2024",
    hora: "18:15",
  },
  {
    servicio: "Depilacion Facial",
    tipo: "Belleza",
    dia: "05/06/2024",
    hora: "18:00",
  },
  {
    servicio: "Punta de Diamante",
    tipo: "Tratamiento Facial",
    dia: "06/06/2024",
    hora: "17:45",
  },
  {
    servicio: "Antiestres",
    tipo: "Masaje",
    dia: "04/06/2024",
    hora: "18:15",
  },
  {
    servicio: "Depilacion Facial",
    tipo: "Belleza",
    dia: "05/06/2024",
    hora: "18:00",
  },
  {
    servicio: "Punta de Diamante",
    tipo: "Tratamiento Facial",
    dia: "06/06/2024",
    hora: "17:45",
  },
  {
    servicio: "Antiestres",
    tipo: "Masaje",
    dia: "04/06/2024",
    hora: "18:15",
  },
  {
    servicio: "Depilacion Facial",
    tipo: "Belleza",
    dia: "05/06/2024",
    hora: "18:00",
  },
  {
    servicio: "Punta de Diamante",
    tipo: "Tratamiento Facial",
    dia: "06/06/2024",
    hora: "17:45",
  },
];

export default function Turn() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { openPopUp } = usePopUp();

  return (
    <div className="turn-page">
      <div className="background-image" />
      <div className="turn-container">
        <div className="titulo">
          <h1>TURNOS</h1>
          <hr />
        </div>
        <div className="misTurnos">
          <h3>Mis Turnos</h3>
          <div className="misTurnos-container">
            {misTurnos.map((turn, index) => (
              <div className="turno" key={index}>
                <div>
                  <h4>{turn.servicio}</h4>
                </div>
                <div>
                  <p>{turn.tipo}</p>
                  <br />
                  <p>{turn.dia}</p>
                  <p>{turn.hora}</p>
                  <br />
                  <input type="submit" className="delete" value="Eliminar" />
                </div>
              </div>
            ))}
          </div>
          <div className="newTurnButton">
            <button className="MainButton" onClick={() => openPopUp("turn")}>
              Agendar Turno
            </button>
          </div>
          <TurnPopUp />
        </div>
      </div>
    </div>
  );
}
