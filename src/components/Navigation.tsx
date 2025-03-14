"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const router = useRouter();

  const menuItems = {
    solutions: [
      { name: "All Solutions", route: "/solutions" },
      {
        name: "AI-Powered Virtual Assistants & Chatbots",
        route: "/solutions/ai-chatbots",
      },
      {
        name: "AI-Driven Automation & Process Optimization",
        route: "/solutions/ai-automation",
      },
      {
        name: "Predictive Analytics & Business Intelligence",
        route: "/solutions/predictive-analytics",
      },
      {
        name: "AI-Based Prototyping & Product Development",
        route: "/solutions/ai-prototyping",
      },
      {
        name: "AI for Cybersecurity & Risk Management",
        route: "/solutions/ai-cybersecurity",
      },
      {
        name: "AI-Powered Personalization & Customer Experience",
        route: "/solutions/ai-personalization",
      },
    ],
    industries: [
      { name: "All Industries", route: "/industries" },
      { name: "Banking & Finance", route: "/industries/banking-finance" },
      { name: "Retail & Ecommerce", route: "/industries/retail-ecommerce" },
      { name: "Healthcare & Life Sciences", route: "/industries/healthcare" },
      { name: "IT & Software Development", route: "/industries/it-software" },
      {
        name: "Manufacturing & Engineering",
        route: "/industries/manufacturing",
      },
      {
        name: "Human Resources & Workforce Management",
        route: "/industries/human-resources",
      },
    ],
    vlog: [
      { name: "Blog", route: "/blog" },
      { name: "Gallery", route: "/gallery" },
    ],
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
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Logo Placeholder */}
          <span className="font-semibold text-xl">AI-Solution</span>
        </div>

        {/* Menu */}
        <Menubar className="flex gap-6 cru">
          <MenubarMenu>
            <MenubarTrigger
              className="font-medium"
              onClick={() => router.push("/")}
            >
              Home
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Solutions</MenubarTrigger>
            <MenubarContent className="min-w-[320px]">
              {menuItems.solutions.map((item) => (
                <MenubarItem
                  key={item.name}
                  onClick={() => router.push(item.route)}
                >
                  {item.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Industries</MenubarTrigger>
            <MenubarContent className="min-w-[280px]">
              {menuItems.industries.map((item) => (
                <MenubarItem
                  key={item.name}
                  onClick={() => router.push(item.route)}
                >
                  {item.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">
              Blog & Gallery
            </MenubarTrigger>
            <MenubarContent>
              {menuItems.vlog.map((item) => (
                <MenubarItem
                  key={item.name}
                  onClick={() => router.push(item.route)}
                >
                  {item.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Right Section */}
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
          </Avatar>{" "}
          {/* Logo Placeholder */}
          <span className="font-semibold text-lg">AI-Solution</span>
        </div>

        {/* Mobile Menu (Sheet) */}
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
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => router.push("/")}
              >
                Home
              </Button>
              <Accordion type="single" collapsible>
                <AccordionItem value="solutions">
                  <AccordionTrigger>Solutions</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {menuItems.solutions.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="justify-start text-left"
                          onClick={() => router.push(item.route)}
                        >
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="industries">
                  <AccordionTrigger>Industries</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {menuItems.industries.map((item) => (
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
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vlog">
                  <AccordionTrigger>Vlog</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {menuItems.vlog.map((item) => (
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                onClick={() => router.push("/feedbacks")}
                variant="ghost"
                className="justify-start"
              >
                Feedbacks
              </Button>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => router.push("/contactus")}
              >
                Contact Us
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navigation;
