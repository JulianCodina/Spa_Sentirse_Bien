import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Simulando el estado de inicio de sesión
  const isLoggedIn = true; // Cambia esto a true para simular que el usuario está logueado

  return (
    <header>
      <div className="marca">
        <Link to="/">
          <img src="src/assets/logo.png" alt="Logo" />
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
        {isLoggedIn && (
          <>
            <Link to="/perfil" className="SecondButton">
              Perfil
            </Link>
            <Link to="/login" className="MainButton">
              Ingresar
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
