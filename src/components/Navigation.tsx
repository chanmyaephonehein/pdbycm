"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname(); // get current route path
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const mainNavItems = [
    { name: "Home", route: "/" },
    { name: "Solutions", route: "/solutions" },
    { name: "Industries", route: "/industries" },
    { name: "Blog & Gallery", route: "/blog" },
  ];

  // Close the drawer only AFTER the route has changed
  useEffect(() => {
    if (pendingRoute && pathname === pendingRoute) {
      setIsSheetOpen(false);
      setPendingRoute(null); // clear
    }
  }, [pathname, pendingRoute]);

  const handleNavigate = (route: string) => {
    if (route !== pathname) {
      setPendingRoute(route); // track that we are waiting for this route
      router.push(route);
    } else {
      setIsSheetOpen(false); // already on route, just close
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-6 py-4 container mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.png"
            alt="AI Solution Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Center Navigation */}
        <Menubar className="flex gap-4 border rounded-md px-4">
          {mainNavItems.map((item) => (
            <MenubarMenu key={item.name}>
              <MenubarTrigger
                className="font-medium cursor-pointer"
                onClick={() => router.push(item.route)}
              >
                {item.name}
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span
            className="font-medium text-gray-600 cursor-pointer"
            onClick={() => router.push("/feedbacks")}
          >
            Feedbacks
          </span>
          <Button variant="outline" onClick={() => router.push("/contactus")}>
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex lg:hidden items-center justify-between w-full px-6 py-4 container mx-auto">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          <Image
            src="/logo.png"
            alt="AI Solution Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              {[
                ...mainNavItems,
                { name: "Feedbacks", route: "/feedbacks" },
                { name: "Contact Us", route: "/contactus" },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate(item.route)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navigation;
