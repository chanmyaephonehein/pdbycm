"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  jobTitle: string;
  jobDetails: string;
  status: string;
}

// ✅ Ensure status options match the enum from Inquiry List
const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
];

const InquiryDetail = () => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch from DB when slug is ready
  useEffect(() => {
    const fetchInquiry = async (inquiryId: string) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/inquiries?id=${inquiryId}`
        );
        if (!res.ok) throw new Error("Inquiry not found");

        const data: Inquiry = await res.json();
        setInquiry(data);
        setStatus(data.status); // ✅ status directly from DB
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error occurred");
      } finally {
        setLoading(false);
      }
    };

    const slug = router.query.slug;
    if (typeof slug === "string") {
      fetchInquiry(slug);
    }
  }, [router.query.slug]);

  // ✅ Update status on dropdown change
  const handleStatusChange = async (newStatus: string) => {
    if (!inquiry) return;
    setStatus(newStatus); // optimistic update

    try {
      const res = await fetch(`http://localhost:3000/api/inquiries`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setInquiry(updated);
      setStatus(updated.status);
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!inquiry) return <div className="p-10">Inquiry not found</div>;

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push("/inquiries")}>
          Back
        </Button>
        <div className="w-64">
          <Label className="mb-1 block">Status</Label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue>{status || "Select status"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-semibold">Inquiry Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input disabled value={inquiry.name} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input disabled value={inquiry.email} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input disabled value={inquiry.phone} />
          </div>
          <div>
            <Label>Company Name</Label>
            <Input disabled value={inquiry.companyName} />
          </div>
          <div>
            <Label>Country</Label>
            <Input disabled value={inquiry.country} />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input disabled value={inquiry.jobTitle} />
          </div>
          <div className="col-span-2">
            <Label>Job Details</Label>
            <Textarea disabled value={inquiry.jobDetails} />
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <Label>Objective</Label>
          <Input placeholder="Enter objective" />

          <Label>Your Response</Label>
          <Textarea placeholder="Enter your response" rows={4} />

          <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
            Send Mail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
