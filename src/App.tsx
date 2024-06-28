import React from "react";
import "./App.css";
import Login from "./auth/login";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
}

export default App;
