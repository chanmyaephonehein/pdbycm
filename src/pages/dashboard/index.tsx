"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { config } from "@/config";

const Dashboard = () => {
  const [totalInquiries, setTotalInquiries] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [adminCount, setAdminCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${config.apiBaseUrl}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();

        setTotalUsers(users.length || 0);

        const admin = users.filter((u: any) => u.role === "Admin").length;
        const staff = users.filter((u: any) => u.role === "Staff").length;
        setAdminCount(admin);
        setStaffCount(staff);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoadingInquiries(true);
      try {
        const token = localStorage.getItem("token");
        const queryParam = filter === "all" ? "" : `?range=${filter}`;
        const res = await fetch(`${config.apiBaseUrl}/inquiries${queryParam}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch inquiries");

        const data = await res.json();
        const total = Array.isArray(data) ? data.length : data.count ?? 0;
        setTotalInquiries(total);

        const pending = data.filter((i: any) => i.status === "PENDING").length;
        const inProgress = data.filter(
          (i: any) => i.status === "IN_PROGRESS"
        ).length;
        const resolved = data.filter(
          (i: any) => i.status === "RESOLVED"
        ).length;

        setPendingCount(pending);
        setInProgressCount(inProgress);
        setResolvedCount(resolved);
      } catch (err) {
        console.error(err);
        setError("Failed to load inquiries.");
        setTotalInquiries(0);
        setPendingCount(0);
        setInProgressCount(0);
        setResolvedCount(0);
      } finally {
        setLoadingInquiries(false);
      }
    };

    fetchInquiries();
  }, [filter]);

  return (
    <div className="p-4 space-y-6">
      <span className="text-gray-600 text-xl font-semibold">
        Users Overview
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-600 shadow-md">
          <CardHeader className="text-blue-600">
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loadingInquiries || totalUsers === null ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              totalUsers
            )}
          </CardContent>
        </Card>

        <Card className="border-purple-500 shadow-md">
          <CardHeader className="text-purple-600">
            <CardTitle>Adminsadsadasd</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {loadingInquiries ? <Skeleton className="h-6 w-16" /> : adminCount}
          </CardContent>
        </Card>

        <Card className="border-pink-500 shadow-md">
          <CardHeader className="text-pink-600">
            <CardTitle>Staffs</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {loadingInquiries ? <Skeleton className="h-6 w-16" /> : staffCount}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-xl font-semibold">
          Inquiries Overview
        </span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[160px] h-12 text-md font-medium">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* 📥 Inquiries Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-500 shadow-sm">
          <CardHeader className="text-gray-700">
            <CardTitle>Total Inquiries ({filter})</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loadingInquiries ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              totalInquiries
            )}
          </CardContent>
        </Card>

        <Card className="border-yellow-500 shadow-sm">
          <CardHeader className="text-yellow-600">
            <CardTitle>PENDING</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {loadingInquiries ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              pendingCount
            )}
          </CardContent>
        </Card>

        <Card className="border-blue-500 shadow-sm">
          <CardHeader className="text-blue-600">
            <CardTitle>IN_PROGRESS</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {loadingInquiries ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              inProgressCount
            )}
          </CardContent>
        </Card>

        <Card className="border-green-500 shadow-sm">
          <CardHeader className="text-green-600">
            <CardTitle>RESOLVED</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {loadingInquiries ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              resolvedCount
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
