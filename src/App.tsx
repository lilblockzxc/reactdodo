import { FC } from "react";

import { Header } from "./pages/Navigations/Header";

import "./scss/app.scss";
import { Home } from "./pages/Home";

import { Route, Routes } from "react-router";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart/Cart";

export const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
