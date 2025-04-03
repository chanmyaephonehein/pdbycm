// Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Sidebar from "./Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const decodeToken = (token: string) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const Navbar = ({ route }: { route: string }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false); // controls mobile drawer

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setUserId(decoded?.id || null);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleProfileClick = () => {
    if (userId) {
      setOpenDrawer(false); // close drawer before navigation
      router.push(`/dashboard`);
    } else {
      alert("User not found in token.");
    }
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      {/* Mobile Sidebar */}
      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <Sidebar inDrawer onNavigate={() => setOpenDrawer(false)} />{" "}
          {/* ✅ */}
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">{route}</h1>

      <div className="flex items-center gap-4">
        <div className="cursor-pointer" onClick={handleProfileClick}>
          <Avatar>
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
        </div>
        <Button variant="outline" onClick={() => setShowLogoutDialog(true)}>
          Logout
        </Button>
      </div>

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
