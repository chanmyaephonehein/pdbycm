"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TokenPayload {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const Sidebar = () => {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const adminIds = [1, 2, 1001]; // Example of known Admin IDs who always get access

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      router.push("/login"); // Not logged in → redirect to login
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setRole(decoded.role);
      setUserId(decoded.id);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  const canAccessUserManagement =
    role === "Admin" || (userId !== null && adminIds.includes(userId));

  return (
    <div className="hidden md:flex flex-col w-64  h-screen p-4 border-r">
      <div
        className="flex items-center gap-3 cursor-pointer mb-8"
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

      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start px-2" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        <Button variant="ghost" className="justify-start px-2" asChild>
          <Link href="/inquiries">Inquiries</Link>
        </Button>

        {canAccessUserManagement && (
          <Button variant="ghost" className="justify-start px-2" asChild>
            <Link href="/users">Users Management</Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
