import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import RootRoutes from "../RootRoutes";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <RootRoutes />
      </div>
    </>
  );
}

export default Layout;
