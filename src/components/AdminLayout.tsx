import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  route: string;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, route }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar route={route} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
