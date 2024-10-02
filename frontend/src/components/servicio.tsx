import "./servicio.css";
import { usePopUp } from "./PopUpContext";

type Props = {
  img: string;
  titulo: string;
  texto: string;
  precio: number;
};

export default function Servicio(props: Props) {
  const { openPopUp } = usePopUp();
  const { img, titulo, texto, precio } = props;

  return (
    <div className="tarjeta" onClick={() => openPopUp("turn")}>
      <img src={img} />
      <div className="info">
        <h4 className="titulo">{titulo}</h4>
        <p>{texto}</p>
        <h4 className="SecondButton">${precio}</h4>
      </div>
    </div>
  );
}
