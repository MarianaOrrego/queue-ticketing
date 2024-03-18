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
    import(/* webpackChunkName: "Home"*/ "../pages/HomePage")
);
const Checkin = lazy(
  () =>
    import(/* webpackChunkName: "Consultant"*/ "../pages/CheckinPage")
);
const Consultant = lazy(
  () =>
    import(/* webpackChunkName: "Consultant"*/ "../pages/ConsultantPage")
);
const Statistics = lazy(
  () =>
    import(/* webpackChunkName: "Consultant"*/ "../pages/StatisticsPage")
);

export const routes: Route[] = [
  {
    path: "home",
    to: "/home",
    Component: Home,
    name: "Turnero",
  },
  {
    path: "checking",
    to: "/checking",
    Component: Checkin,
    name: "Check in",
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