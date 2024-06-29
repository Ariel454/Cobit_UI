import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PetsIcon from "@mui/icons-material/Pets";
import BuildIcon from "@mui/icons-material/Build";

const drawerWidth = 240;

const Sidebar = () => {
  const { auth } = useAuth();
  if (!auth.auth) return null;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: drawerWidth,
          top: "64px", // Ajuste para que comience debajo del Header
          height: "calc(100% - 64px)", // Ajuste para que ocupe el resto de la pantalla
          position: "fixed",
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Matriz de alineamiento " />
        </ListItem>
        <Divider />
        {/* <ListItem button component={Link} to="/intervenciones">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Intervenciones" />
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
