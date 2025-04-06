import { Grid } from "@mui/material";
import StatCard from "../StatCard.tsx";
import { FlexibilityOpportunity } from "../../api/flexibilityOpportunitiesApi.ts";
import { formatCurrency } from "../../utils/currencyFormatting.ts";

type FlexibilityOpportunitiesProps = {
  flexibilityOpportunities: FlexibilityOpportunity[];
};

function FlexibilityOpportunitiesVisualisation({
  flexibilityOpportunities,
}: FlexibilityOpportunitiesProps) {
  return (
    <>
      <Grid container>
        {flexibilityOpportunities.map((flexibilityOpportunity) => (
          <StatCard
            key={`${flexibilityOpportunity.startTime}-${flexibilityOpportunity.endTime}`}
            stat={`${formatCurrency(flexibilityOpportunity.pricePerKwh)} per kWh`}
            label={`From ${flexibilityOpportunity.startTime} to ${flexibilityOpportunity.endTime}`}
          />
        ))}
      </Grid>
    </>
  );
}

export default FlexibilityOpportunitiesVisualisation;
