import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getPageTitle } from "../router/routerLinks";

export default function usePageTitle() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState(getPageTitle(location.pathname));

  useEffect(() => {
    setPageTitle(getPageTitle(location.pathname));
  }, [location.pathname]);

  return pageTitle;
}
