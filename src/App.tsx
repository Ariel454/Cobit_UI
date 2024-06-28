import React, { Fragment, ReactNode } from "react";
import Login from "./auth/login";
import { AuthContextProvider, useAuth } from "./context/authContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import { Box, CssBaseline } from "@mui/material";
import Home from "./administration/Home/home";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box component="main" flexGrow={1} p={3}>
          {children}
        </Box>
      </Box>
    </Fragment>
  );
};
function App() {
  const { auth } = useAuth();

  return (
    <AuthContextProvider>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              auth.auth ? (
                <AppLayout>
                  {/* Aquí puedes agregar tus rutas protegidas */}
                  <Route path="/" element={<Home />} />
                  {/* Agrega más rutas según sea necesario */}
                </AppLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
