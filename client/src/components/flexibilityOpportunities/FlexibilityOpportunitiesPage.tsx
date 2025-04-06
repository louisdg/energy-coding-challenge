import api from "../../api/api.ts";
import useApi from "../../hooks/useApi.ts";
import FlexibilityOpportunitiesVisualisation from "./FlexibilityOpportunitiesVisualisation.tsx";

function FlexibilityOpportunitiesPage() {
  const flexibilityOpportunities = useApi(
    api.flexibilityOpportunities.getFlexibilityOpportunities,
  );

  return (
    <FlexibilityOpportunitiesVisualisation
      flexibilityOpportunities={
        flexibilityOpportunities === "LOADING" ||
        flexibilityOpportunities === "LOADING_ERROR"
          ? []
          : flexibilityOpportunities
      }
    />
  );
}

export default FlexibilityOpportunitiesPage;
