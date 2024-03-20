import { Suspense } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import logo from "../logo.svg";
import { routes } from "./routes";
import { handleClearLocalStorage } from "../functions";

import "../styles/card.css";

export const Navigation = () => {
  return (
    <Suspense fallback={<span>Loading ...</span>}>
      <BrowserRouter>
        <div className="row col-md-12">
          <div className="col-md-3">
            <nav>
              <img src={logo} alt="React Logo" />
              <ul>
                {routes.map(({ to, name }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
                <div className="container">
                  <button
                    className="card-button"
                    onClick={handleClearLocalStorage}
                  >
                    Reiniciar sistema
                  </button>
                </div>
              </ul>
            </nav>
          </div>
          <div className="col-md-9">
            <Routes>
              {routes.map(({ to, path, Component }) => (
                <Route key={to} path={path} element={<Component />} />
              ))}

              <Route
                path="*"
                element={<Navigate to={routes[0].to} replace />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};
