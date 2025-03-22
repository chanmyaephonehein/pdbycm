import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

// interface NavbarProps {
//   toggleSidebar?: () => void;
// }

const Navbar = ({ route }: { route: string }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <h1 className="text-lg font-semibold">{route}</h1>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => {
          localStorage.removeItem("token");
          router.push({ pathname: "/login" });
        }}
      >
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Navbar;
