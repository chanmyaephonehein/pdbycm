"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper to decode JWT
const decodeToken = (token: string) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

const Navbar = ({ route }: { route: string }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setUserId(decoded?.id || null); // assumes token has `id` field
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      {/* Mobile Sidebar Toggle */}
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

      {/* Page Title */}
      <h1 className="text-lg font-semibold">{route}</h1>

      {/* Profile and Logout */}
      <div className="flex items-center gap-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (userId) {
              router.push(`/profile/${userId}`);
            } else {
              alert("User not found in token.");
            }
          }}
        >
          <Avatar>
            <AvatarImage src="/sample.jpg" alt="User Avatar" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
