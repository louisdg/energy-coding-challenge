import { Container, Stack } from "@mui/material";
import { Navigate, Route, Routes } from "react-router";
import PageTitle from "./PageTitle.tsx";
import { SIDE_MENU_WIDTH } from "./SideMenu.tsx";
import spacing from "../theme/spacing.ts";
import EnergyPricesPage from "./energyPrices/EnergyPricesPage.tsx";
import HouseholdEnergyUsagePage from "./householdEnergyUsage/HouseholdEnergyUsagePage.tsx";
import FlexibilityOpportunitiesPage from "./flexibilityOpportunities/FlexibilityOpportunitiesPage.tsx";

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
          <Route
            path="household-energy-usage"
            element={<HouseholdEnergyUsagePage />}
          />
          <Route
            path="flexibility-opportunities"
            element={<FlexibilityOpportunitiesPage />}
          />
          <Route path="*" element={<Navigate to="/energy-prices" replace />} />
        </Routes>
      </Stack>
    </Container>
  );
}

export default MainContent;
