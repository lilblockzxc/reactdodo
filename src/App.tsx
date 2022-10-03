import React, { FC, Suspense } from "react";

import "./scss/app.scss";

import { Route, Routes } from "react-router";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart/Cart";
import { FullPizza } from "./pages/FullPizza";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";

// const FullPizza = React.lazy(() => import("./pages/FullPizza"));
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// const Cart = React.lazy(() => import("./pages/Cart/Cart"));
// const Home = React.lazy(() => import("./pages/Home"));
// const NotFound = React.lazy(() => import("./pages/NotFound"));

export const App: FC = () => {
  return (
    // <div className="wrapper">
    //   <Header />
    //   <div className="content">
    //     <Routes>
    //       <Route path={"/"} element={<Home />} />
    //       <Route path={"/cart"} element={<Cart />} />
    //       <Route path={"/pizza/:id"} element={<FullPizza />} />
    //       <Route path={"*"} element={<NotFound />} />
    //     </Routes>
    //   </div>
    // </div>

    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route path={""} element={<Home />} />
        <Route path={"cart"} element={<Cart />} />
        <Route path={"pizza/:id"} element={<FullPizza />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
