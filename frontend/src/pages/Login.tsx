import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import IUser from "../types/IUser.ts";
import { useForm, FieldValues } from "react-hook-form";
import { useState, useEffect, useLayoutEffect } from "react";

// Función para convertir FieldValues a User
function convertFieldValuesToUser(fields: FieldValues): IUser {
  return {
    id: fields.id || "",
    email: fields.email || "",
    username: fields.username || "",
    password: fields.password || "",
    names: fields.names,
    surnames: fields.surnames,
    sex: fields.sex,
    isAdmin: fields.isAdmind,
  };
}

export function Login() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(convertFieldValuesToUser(data));
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="ingreso">
      <div className="background-image" />
      <div className="contenedor ">
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
        <form onSubmit={onSubmit}>
          <label>
            <p>Correo electrónico</p>
            <input
              className="textbox"
              type="email"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <p>El campo email es requerido</p>}
          </label>
          <label>
            <p>Contraseña</p>
            <input
              className="textbox"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>El campo contraseña es requerido</p>}
          </label>
          <p className="MensajeError">* Correo o contraseña incorrectos.</p>
          <button className="MainButton" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const [/*passwordMatch*/, setPasswordMatch] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password === values.password2) {
      setPasswordMatch(true);
      signup(convertFieldValuesToUser(values));
    } else {
      setPasswordMatch(false);
    }
  });

  return (
    <div className="ingreso">
      <div className="background-image" />
      <div className="contenedor R">
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

        <form onSubmit={onSubmit}>
          <label>
            <p>Nombre de Ususario</p>
            <input
              className="textbox"
              type="text"
              {...register("username", { required: true })}
            ></input>
            {errors.username && <p>El campo nombre es requerido</p>}
          </label>
          <label>
            <p>Correo electrónico</p>
            <input
              className="textbox"
              type="email"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <p>El campo email es requerido</p>}
          </label>
          <label>
            <p>Contraseña</p>
            <input
              className="textbox"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>El campo contraseña es requerido</p>}
          </label>
          <label>
            <p>Confirmar contraseña</p>
            <input
              className="textbox"
              type="password"
              {...register("password2", { required: true })}
            />
            {errors.password && <p>Debe confirmar su contraseña</p>}
          </label>
          <p className="MensajeError">* Correo ya en uso.</p>
          <button className="MainButton" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
