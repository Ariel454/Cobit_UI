import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const navigate = useNavigate();
  const { auth, guardarAuth } = useAuth();

  const cerrarSesion = () => {
    guardarAuth({
      token: "",
      auth: false,
    });
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ zIndex: 999 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JC - Administrador de Animales
        </Typography>
        {auth.auth && (
          <Button color="inherit" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
