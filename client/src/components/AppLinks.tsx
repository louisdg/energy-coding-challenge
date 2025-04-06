import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import AppLink from "./AppLink.tsx";
import routerLinks from "../router/routerLinks.tsx";

function AppLinks() {
  return (
    <Stack component="nav" direction="column">
      <List>
        {routerLinks.map((routerLink) => (
          <AppLink key={routerLink.href} routerLink={routerLink} />
        ))}
      </List>
    </Stack>
  );
}

export default AppLinks;
