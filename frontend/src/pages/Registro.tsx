import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import IUser from "../types/IUser.ts";
import { useForm, FieldValues } from "react-hook-form";
import { useState, useEffect } from "react";


function convertFieldValuesToUser(fields: FieldValues): IUser {
    return {
      id: fields.id || "",
      email: fields.email || "",
      username: fields.username || "",
      password: fields.password || "",
      names: fields.names,
      phone: fields.phone  ||"",
      surnames: fields.surnames,
      sex: fields.sex,
      role: fields.role,
    };
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
    }, [isAuthenticated, navigate]);
  
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
            {/*<p className="MensajeError">* Correo ya en uso.</p> */}
            <button className="MainButton" type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    );
  }


export default Register