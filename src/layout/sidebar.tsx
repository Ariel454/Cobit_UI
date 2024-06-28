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

const Sidebar = () => {
  const { auth } = useAuth();
  if (!auth.auth) return null;

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Animales" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/intervenciones">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Intervenciones" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
