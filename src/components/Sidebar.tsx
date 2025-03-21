"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-100 h-screen p-4 border-r">
      <div className="text-2xl font-bold mb-6 px-2">AI-Solution</div>

      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start px-2" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        <Button variant="ghost" className="justify-start px-2" asChild>
          <Link href="/inquiries">Inquiries</Link>
        </Button>

        <Button variant="ghost" className="justify-start px-2" asChild>
          <Link href="/users">Users Management</Link>
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
