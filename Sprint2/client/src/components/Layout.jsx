import React from "react";
import { BrowserRouter, Outlet } from "react-router-dom";

function Layout() {
    return (
      {/* Navbar here */}
    <Outlet />
  );
}

export default Layout;
