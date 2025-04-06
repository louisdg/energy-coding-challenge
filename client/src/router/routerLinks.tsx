import { ReactNode } from "react";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";

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
