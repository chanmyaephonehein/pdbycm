import React, { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "./AdminLayout";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isLogin = router.pathname.includes("login");
  const isDashboard = router.pathname.includes("dashboard");
  const isInquiries = router.pathname.includes("inquiries");
  const isUsers = router.pathname.includes("users");
  const isReset = router.pathname.includes("reset");
  const isVerify = router.pathname.includes("verify");
  const isPf = router.pathname.includes("profile");
  if (isLogin) {
    return <div className="">{children}</div>;
  }
  if (isDashboard || isInquiries || isUsers || isPf) {
    if (isDashboard) {
      return (
        <AdminLayout route="Dashboard">
          <div>{children}</div>
        </AdminLayout>
      );
    }
    if (isInquiries) {
      return (
        <AdminLayout route="Inquiries">
          <div>{children}</div>
        </AdminLayout>
      );
    }
    if (isUsers) {
      return (
        <AdminLayout route="Users Management">
          <div>{children}</div>
        </AdminLayout>
      );
    }
    if (isPf) {
      return (
        <AdminLayout route="Profile">
          <div>{children}</div>
        </AdminLayout>
      );
    }
  }
  if (isReset || isVerify) {
    return <div>{children}</div>;
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
