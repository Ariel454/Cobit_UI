import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const { auth, guardarAuth } = useAuth();

  console.log(auth);
  const navigate = useNavigate();
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
        Swal.fire("Login Correcto", "Ha iniciado sesión", "success");
      }

      // navigate redireccioar
      navigate("/");
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={iniciarSesion} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={leerDatos}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={leerDatos}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
