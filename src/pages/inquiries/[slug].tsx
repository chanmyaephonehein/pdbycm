"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

const InquiryDetail = () => {
  const router = useRouter();
  const id = router.query.slug as string; // Extract ID from URL
  console.log(id);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInquiry = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inquiries?id=${id}`
      );

      if (!response.ok) throw new Error("No inquiry found");

      const data: Inquiry = await response.json();
      console.log(data);
      setInquiry(data);
      setStatus(data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || typeof id !== "string") return; // Ensure `id` is valid
    fetchInquiry();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!inquiry) return <div className="p-10">Inquiry not found</div>;

  const statusOptions = ["Pending", "In Progress", "Complete"];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => router.push("/inquiries")}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        <div className="col-span-2">
          <p className="font-bold">Status</p>
          <select
            className="border border-gray-300 rounded p-2 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Inquiry Detail</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Name</p>
            <p>{inquiry.name}</p>
          </div>
          <div>
            <p className="font-bold">Email Address</p>
            <p>{inquiry.email}</p>
          </div>
          <div>
            <p className="font-bold">Phone Number</p>
            <p>{inquiry.phone}</p>
          </div>
          <div>
            <p className="font-bold">Company Name</p>
            <p>{inquiry.companyName}</p>
          </div>
          <div>
            <p className="font-bold">Country</p>
            <p>{inquiry.country}</p>
          </div>
          <div>
            <p className="font-bold">Job Title</p>
            <p>{inquiry.jobTitle}</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold">Job Details</p>
            <p>{inquiry.jobDetails}</p>
          </div>
        </div>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Enter Objective"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Enter your response"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
