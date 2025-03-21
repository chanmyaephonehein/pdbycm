"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [totalInquiries, setTotalInquiries] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch inquiries and users count
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [inquiriesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/api/inquiries"),
          fetch("http://localhost:3000/api/users"),
        ]);

        if (!inquiriesRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const inquiries = await inquiriesRes.json();
        const users = await usersRes.json();

        setTotalInquiries(inquiries.length);
        setTotalUsers(users.length);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Inquiries Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-6 w-16" />
          ) : error ? (
            "Error"
          ) : (
            totalInquiries
          )}
        </CardContent>
      </Card>

      {/* Total Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-6 w-16" />
          ) : error ? (
            "Error"
          ) : (
            totalUsers
          )}
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card className="col-span-1 md:col-span-2 mt-6">
        <CardHeader>
          <CardTitle>Inquiries by Date</CardTitle>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center border border-dashed">
          Chart
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
