import React, { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isLogin = router.pathname.includes("login");
  if (isLogin) {
    return <div className="">{children}</div>;
  }
  return (
    <div>
      <Navigation />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
