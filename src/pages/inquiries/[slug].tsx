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
import { Mail, ArrowLeft, Info } from "lucide-react";

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
  createdAt: string;
}

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

  const [objective, setObjective] = useState("");
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendEmail = async () => {
    if (!inquiry || !response) return;
    setSending(true);

    try {
      const res = await fetch("http://localhost:3000/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: inquiry.email,
          objective,
          response,
          inquiryId: inquiry.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to send email");

      alert("Email sent successfully!");
      setObjective("");
      setResponse("");
    } catch (error) {
      alert("Failed to send email");
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchInquiry = async (inquiryId: string) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/inquiries?id=${inquiryId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Inquiry not found");

        const data: Inquiry = await res.json();
        setInquiry(data);
        setStatus(data.status);
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

  const handleStatusChange = async (newStatus: string) => {
    if (!inquiry) return;
    setStatus(newStatus);

    try {
      const res = await fetch(`http://localhost:3000/api/inquiries`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
      {/* Navigation + Status */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/inquiries")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
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

      {/* Summary Header with CreatedAt */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-4">
          <Info className="text-blue-500 w-6 h-6" />
          <div>
            <p className="text-lg font-semibold">{inquiry.name}</p>
            <p className="text-sm text-gray-600">
              {inquiry.jobTitle} at {inquiry.companyName} ({inquiry.country})
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          Created at:{" "}
          <span className="font-medium text-gray-700">
            {new Date(inquiry.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

      {/* Inquiry Details Section */}
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

        {/* Email Response Form */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Mail className="w-5 h-5 mr-2" /> Send Email Response
          </h3>

          <Label>Objective</Label>
          <Input
            placeholder="Enter objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />

          <Label>Your Response</Label>
          <Textarea
            placeholder="Enter your response"
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />

          <Button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSendEmail}
            disabled={sending || !response}
          >
            {sending ? "Sending..." : "Send Mail"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
