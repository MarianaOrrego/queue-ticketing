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
const Consultant = lazy(
  () =>
    import(/* webpackChunkName: "Consultant"*/ "../pages/ConsultantPage")
);

export const routes: Route[] = [
  {
    path: "home",
    to: "/home",
    Component: Home,
    name: "Main page",
  },
  {
    path: "consultant",
    to: "/consultant",
    Component: Consultant,
    name: "Informations consultant",
  }
];