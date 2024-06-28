import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";

function Login() {
  const { auth, guardarAuth } = useAuth();
  console.log(auth);
  const [credenciales, guardarCredenciales] = useState({
    email: "",
    password: "",
  });

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = "123";
      localStorage.setItem("token", token);
      guardarAuth({ token, auth: true });

      if (credenciales.email === "admin" && credenciales.password === "admin") {
        Swal.fire("Login Correcto", "Ha iniciado sesion", "success");
      }

      // navigate redireccioar
      // navigate("/");
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response?.data?.mensaje || "Ocurrió un error",
      });
    }
  };

  const leerDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email de inicio de sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password de inicio de sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
