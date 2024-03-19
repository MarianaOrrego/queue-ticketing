import { lazy, LazyExoticComponent } from "react";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

const Home = lazy(
  () =>
    import(/* webpackChunkName: "HomePage"*/ "../pages/HomePage")
);
const Checkin = lazy(
  () =>
    import(/* webpackChunkName: "CheckinPage"*/ "../pages/CheckinPage")
);
const Consultant = lazy(
  () =>
    import(/* webpackChunkName: "ConsultantPage"*/ "../pages/ConsultantPage")
);
const Statistics = lazy(
  () =>
    import(/* webpackChunkName: "StatisticsPage"*/ "../pages/StatisticsPage")
);

export const routes: Route[] = [
  {
    path: "checking",
    to: "/checking",
    Component: Checkin,
    name: "Check in",
  },
  {
    path: "home",
    to: "/home",
    Component: Home,
    name: "Turnero",
  },
  {
    path: "consultant",
    to: "/consultant",
    Component: Consultant,
    name: "Asesor",
  },
  {
    path: "statistics",
    to: "/statistics",
    Component: Statistics,
    name: "Estadisticas",
  }
];