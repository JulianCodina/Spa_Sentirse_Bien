import { Link } from "react-router-dom";
import "./Header.css";
import { Dispatch } from "react";

type Props = {
  SetIsOpen: Dispatch<React.SetStateAction<boolean>>;
  IsOpen: boolean;
};

function Header({ SetIsOpen, IsOpen }: Props) {
  // Simulando el estado de inicio de sesión
  const isLoggedIn = true; // Cambia esto a true para simular que el usuario está logueado
  const isAdmin = true; // Cambia esto a true para simular que el usuario es admin

  return (
    <header>
      <div className="marca">
        {/* Rendnerizado condicional */}
        {isAdmin && (
          <>
            <img
              onClick={() => SetIsOpen(!IsOpen)}
              className="options"
              src="src/assets/barra-lateral.png"
              alt="NavBar"
            />
          </>
        )}
        <Link to="/">
          <img className="logo" src="src/assets/logo.png" alt="Logo" />
        </Link>
        <Link to="/">
          <p className="MarcaName">Sentirse bien</p>
        </Link>
      </div>
      <div className="enlaces">
        <Link to="/">Inicio</Link>
        <Link to="/galeria">Galería</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/turnos">Turnos</Link>

        {/* Rendnerizado condicional */}
        {isLoggedIn ? (
          <>
            <Link to="/perfil" className="SecondButton">
              Perfil
            </Link>
          </>
        ) : (
          <Link to="/login" className="MainButton">
            Ingresar
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
