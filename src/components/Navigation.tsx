"use client";

import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Navigation = () => {
  const router = useRouter();

  const mainNavItems = [
    { name: "Home", route: "/" },
    { name: "Solutions", route: "/solutions" },
    { name: "Industries", route: "/industries" },
    { name: "Blog & Gallery", route: "/blog" },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-6 py-4 container mx-auto">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.png" // your actual logo file
            alt="AI Solution Logo"
            width={140} // increase this
            height={140} // and this
            className="object-contain" // or object-cover if you want it cropped
          />
        </div>

        {/* Center: Main Navigation */}
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

        {/* Right: Feedbacks & Contact */}
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
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">AI-Solution</span>
        </div>

        {/* Mobile Menu */}
        <Sheet>
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
                  onClick={() => router.push(item.route)}
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
