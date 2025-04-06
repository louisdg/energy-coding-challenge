import { ReactNode } from "react";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";

export type RouterLink = {
  title: string;
  href: string;
  icon: ReactNode;
};

const routerLinks: RouterLink[] = [
  {
    title: "Energy prices",
    href: "/energy-prices",
    icon: <PriceChangeRoundedIcon />,
  },
  {
    title: "Household energy usage",
    href: "/household-energy-usage",
    icon: <HouseRoundedIcon />,
  },
  {
    title: "Flexibility opportunities",
    href: "/flexibility-opportunities",
    icon: <QueryStatsRoundedIcon />,
  },
];

export function getPageTitle(pathname: string) {
  const routerLink = routerLinks.find((routerLink) =>
    pathname.startsWith(routerLink.href),
  );
  if (!routerLink) {
    return null;
  }

  return routerLink.title;
}

export default routerLinks;
