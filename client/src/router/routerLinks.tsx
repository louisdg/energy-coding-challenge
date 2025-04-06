import { ReactNode } from "react";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";

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
