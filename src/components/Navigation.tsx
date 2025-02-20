import React from "react";
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

const Navigation = () => {
  const menuItems = {
    solutions: [
      "All Solutions",
      "AI-Powered Virtual Assistants & Chatbots",
      "AI-Driven Automation & Process Optimization",
      "Predictive Analytics & Business Intelligence",
      "AI-Based Prototyping & Product Development",
      "AI for Cybersecurity & Risk Management",
      "AI-Powered Personalization & Customer Experience",
    ],
    industries: [
      "All Industries",
      "Banking & Finance",
      "Retail & Ecommerce",
      "Healthcare & Life Sciences",
      "IT & Software Development",
      "Manufacturing & Engineering",
      "Human Resources & Workforce Management",
    ],
    vlog: ["Blog", "Gallery"],
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-6 py-4 container mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border"></div>{" "}
          {/* Logo Placeholder */}
          <span className="font-semibold text-xl">AI-Solution</span>
        </div>

        {/* Menu */}
        <Menubar className="flex gap-6">
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Home</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Solutions</MenubarTrigger>
            <MenubarContent className="min-w-[320px]">
              {menuItems.solutions.map((item) => (
                <MenubarItem key={item}>{item}</MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Industries</MenubarTrigger>
            <MenubarContent className="min-w-[280px]">
              {menuItems.industries.map((item) => (
                <MenubarItem key={item}>{item}</MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Vlog</MenubarTrigger>
            <MenubarContent>
              {menuItems.vlog.map((item) => (
                <MenubarItem key={item}>{item}</MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">Feedback</span>
          <Button variant="outline">Contact Us</Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex lg:hidden items-center justify-between w-full px-6 py-4 container mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border"></div>{" "}
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
              <Button variant="ghost" className="justify-start">
                Home
              </Button>
              <Accordion type="single" collapsible>
                <AccordionItem value="solutions">
                  <AccordionTrigger>Solutions</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {menuItems.solutions.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="justify-start text-left"
                        >
                          {item}
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
                          key={item}
                          variant="ghost"
                          className="justify-start"
                        >
                          {item}
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
                          key={item}
                          variant="ghost"
                          className="justify-start"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button variant="ghost" className="justify-start">
                Feedback
              </Button>
              <Button variant="outline" className="mt-2">
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
