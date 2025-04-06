import { Typography } from "@mui/material";
import usePageTitle from "../hooks/usePageTitle.ts";

function PageTitle() {
  const pageTitle = usePageTitle();
  return <Typography variant="h1">{pageTitle}</Typography>;
}

export default PageTitle;
