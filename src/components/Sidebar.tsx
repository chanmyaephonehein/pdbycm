// Sidebar.tsx
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

interface SidebarProps {
  inDrawer?: boolean;
  onNavigate?: () => void; // 🔑 NEW prop
}

const Sidebar = ({ inDrawer = false, onNavigate }: SidebarProps) => {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const adminIds = [1, 2, 1001];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      router.push("/login");
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

  const containerClass = inDrawer
    ? "flex flex-col w-full h-full p-4"
    : "hidden md:flex flex-col w-64 h-screen p-4 border-r";

  return (
    <div className={containerClass}>
      <div
        className="flex items-center gap-3 cursor-pointer mb-8"
        onClick={() => {
          onNavigate?.();
          router.push("/");
        }}
      >
        <Image src="/logo.png" alt="Logo" width={140} height={140} />
      </div>

      <nav className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="justify-start px-2"
          asChild
          onClick={onNavigate}
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        <Button
          variant="ghost"
          className="justify-start px-2"
          asChild
          onClick={onNavigate}
        >
          <Link href="/inquiries">Inquiries</Link>
        </Button>

        {canAccessUserManagement && (
          <Button
            variant="ghost"
            className="justify-start px-2"
            asChild
            onClick={onNavigate}
          >
            <Link href="/users">Users Management</Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
