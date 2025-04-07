import { Link, useLocation } from "react-router";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RouterLink } from "../router/routerLinks.tsx";

type NavLinkProps = {
  routerLink: RouterLink;
};

function AppLink({ routerLink }: NavLinkProps) {
  const location = useLocation();

  return (
    <ListItem>
      <ListItemButton
        selected={location.pathname.startsWith(routerLink.href)}
        component={Link}
        to={routerLink.href}
        dense
      >
        <ListItemIcon>{routerLink.icon}</ListItemIcon>
        <ListItemText primary={routerLink.title} />
      </ListItemButton>
    </ListItem>
  );
}

export default AppLink;
