import { Drawer, Stack } from "@mui/material";
import AppLinks from "./AppLinks.tsx";
import spacing from "../theme/spacing.ts";

export const SIDE_MENU_WIDTH = 300;

function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{ display: "block", width: SIDE_MENU_WIDTH }}
      slotProps={{
        paper: { sx: { width: SIDE_MENU_WIDTH, padding: spacing.sm } },
      }}
    >
      <Stack direction="column">
        <AppLinks />
      </Stack>
    </Drawer>
  );
}

export default SideMenu;
