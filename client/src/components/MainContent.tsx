import { Container, Stack } from "@mui/material";
import { Route, Routes } from "react-router";
import PageTitle from "./PageTitle.tsx";
import { SIDE_MENU_WIDTH } from "./SideMenu.tsx";
import spacing from "../theme/spacing.ts";
import EnergyPricesPage from "./energy-prices/EnergyPricesPage.tsx";

function MainContent() {
  return (
    <Container
      component="main"
      sx={{ width: `calc(100% - ${SIDE_MENU_WIDTH}px)` }}
    >
      <Stack spacing={spacing.md}>
        <PageTitle />
        <Routes>
          <Route path="energy-prices" element={<EnergyPricesPage />} />
        </Routes>
      </Stack>
    </Container>
  );
}

export default MainContent;
