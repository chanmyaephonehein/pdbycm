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

const Dashboard = () => {
  const [totalInquiries, setTotalInquiries] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Fetch total users (only once)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();
        setTotalUsers(users.length || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data.");
      }
    };

    fetchUsers();
  }, []);

  // ✅ Fetch inquiries (on filter change)
  useEffect(() => {
    const fetchInquiries = async () => {
      setLoadingInquiries(true);
      try {
        const token = localStorage.getItem("token");
        const queryParam = filter === "all" ? "" : `?range=${filter}`;
        const res = await fetch(
          `http://localhost:3000/api/inquiries${queryParam}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch inquiries");

        const data = await res.json();
        const total = Array.isArray(data) ? data.length : data.count ?? 0;
        setTotalInquiries(total);
      } catch (err) {
        console.error(err);
        setError("Failed to load inquiries.");
        setTotalInquiries(0); // fallback to 0
      } finally {
        setLoadingInquiries(false);
      }
    };

    fetchInquiries();
  }, [filter]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-xl">Select a filter:</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingInquiries || totalUsers === null ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              totalUsers
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Inquiries ({filter})</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingInquiries ? (
              <Skeleton className="h-6 w-16" />
            ) : error ? (
              "Error"
            ) : (
              totalInquiries ?? 0
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
