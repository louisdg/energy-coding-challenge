import { Drawer, Stack } from "@mui/material";
import AppLinks from "./AppLinks.tsx";

export const SIDE_MENU_WIDTH = 240;

function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{ display: "block", width: SIDE_MENU_WIDTH }}
      slotProps={{ paper: { sx: { width: SIDE_MENU_WIDTH } } }}
    >
      <Stack direction="column">
        <AppLinks />
      </Stack>
    </Drawer>
  );
}

export default SideMenu;
