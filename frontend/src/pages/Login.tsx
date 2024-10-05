import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import IUser from "../types/IUser.ts";
import { useForm, FieldValues } from "react-hook-form";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown.tsx";

// Función para convertir FieldValues a User
function convertFieldValuesToUser(fields: FieldValues): IUser {
  return {
    id: fields.id || "",
    email: fields.email || "",
    username: fields.username || "",
    password: fields.password || "",
    phone: fields.phone,
    sex: fields.sex,
    role: fields.role,
    isAdmin: fields.isAdmin, // Corregido de 'isAdmind' a 'isAdmin'
  };
}

// Componente Login
export function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hooks del formulario y autenticación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>(); // Tipado mejorado con IUser para validación
  const { signin, isAuthenticated, errors: signinErrors } = useAuth(); // Cambié errors por signinErrors para más claridad
  const navigate = useNavigate();

  // Función onSubmit que maneja el envío del formulario
  const onSubmit = handleSubmit((data) => {
    signin(convertFieldValuesToUser(data));
  });

  // Efecto que redirige si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="ingreso">
      <div className="background-image" />
      <div className="contenedor ">
        {/* Mostrar errores de autenticación, si existen */}
        {signinErrors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}

        <div className="titulo">
          <h1>Hola de nuevo!</h1>
          <p>👋</p>
        </div>

        <p>
          Inicia sesión o <Link to="/registro">regístrate</Link> para solicitar
          un turno
        </p>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={onSubmit}>
          <label>
            <p>Correo electrónico</p>
            <input
              className="textbox"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="MensajeError">El campo email es requerido</p>
            )}
          </label>
          <label>
            <p>Contraseña</p>
            <input
              className="textbox"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="MensajeError">El campo contraseña es requerido</p>
            )}
          </label>

          <button className="MainButton" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

// Componente Register
export function Register() {
  // Hooks del formulario y autenticación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>(); // Tipado mejorado con IUser
  const { signup, isAuthenticated, errors: registerErrors } = useAuth(); // Cambié errors por registerErrors para más claridad
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // Habilité el uso de passwordMatch
  const [password2, setPassword2] = useState<string>(""); // Estado para manejar password2
  const navigate = useNavigate();

  // Efecto que redirige si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // Función onSubmit que maneja el envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    // Verificamos si las contraseñas coinciden
    if (values.password === password2) {
      // Comprobamos password y password2 aquí
      setPasswordMatch(true);
      signup(convertFieldValuesToUser(values)); // Convertimos los valores relevantes a IUser, pero excluyendo password2
    } else {
      setPasswordMatch(false); // Si no coinciden, actualizamos el estado para mostrar el mensaje de error
    }
  });

  return (
    <div className="ingreso">
      <div className="background-image" />
      <div className="contenedor R">
        {/* Mostrar errores de registro, si existen */}
        {registerErrors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
        <div className="titulo">
          <h1>Bienvenido!</h1>
          <p id="R">🙌</p>
        </div>

        <p>
          <Link to="/login">Inicia sesión</Link> o regístrate para solicitar un
          turno
        </p>

        {/* Formulario de registro */}
        <form onSubmit={onSubmit}>
          <label>
            <p>Nombre Completo</p>
            <input
              className="textbox"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="MensajeError">
                El campo nombre de usuario es requerido
              </p>
            )}
          </label>
          <label>
            <p>Correo electrónico</p>
            <input
              className="textbox"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="MensajeError">El campo email es requerido</p>
            )}
          </label>

          <div className="par">
            <label className="item">
              <p>Teléfono</p>
              <input
                className="textbox"
                type="text"
                {...register("phone", { required: true })}
              />
            </label>
            <label className="item">
              <p>Genero</p>
              <Dropdown
                label={"Genero"}
                options={["Mujer", "Hombre", "Otro"]}
              />
            </label>
            {errors.phone && (
              <p className="MensajeError">Debe indicar su número de teléfono</p>
            )}
          </div>

          <label>
            <p>Contraseña</p>
            <input
              className="textbox"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="MensajeError">El campo contraseña es requerido</p>
            )}
          </label>
          <label>
            <p>Confirmar contraseña</p>
            <input
              className="textbox"
              type="password"
              value={password2} // Asignamos el valor de password2
              onChange={(e) => setPassword2(e.target.value)} // Manejamos el cambio con setPassword2
            />
            {errors.password && (
              <p className="MensajeError">Debe confirmar su contraseña</p>
            )}
          </label>

          {/* Mensaje de error si las contraseñas no coinciden */}
          {!passwordMatch && <p>Las contraseñas no coinciden</p>}
          {/* Error de correo ya en uso */}
          {registerErrors.includes("Correo ya en uso") && (
            <p className="MensajeError">* Correo ya en uso.</p>
          )}

          <button className="MainButton" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
