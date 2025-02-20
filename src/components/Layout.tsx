import React, { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
