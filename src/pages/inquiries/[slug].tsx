"use client";

import { useState } from "react";
import { useRouter } from "next/router";

const InquiryDetail = () => {
  const router = useRouter();
  // const { slug } = router.query;

  // Static inquiry details data
  const inquiries = {
    name: "Thomas Muller",
    email: "thomasmuller25@gmail.com",
    phone: "+49 761 123 4567",
    company: "Bayern Muchen",
    country: "Germany",
    jobTitle: "AI implementation in VAR System",
    jobDetails:
      "Allianz arena wants to implement the AI implementation in VAR System like offside system and foul system for better accuracy",
    status: "Pending", // Initial status

    // You can add more inquiries here as needed
  };

  // Get the inquiry details for the current slug
  // const inquiry = inquiries[slug];

  // if (!inquiry) {
  //   return <div>Inquiry not found</div>;
  // }

  const [status, setStatus] = useState(inquiries.status);

  const statusOptions = ["Pending", "In Progress", "Complete"];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => router.back()}
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
            <p>{inquiries.name}</p>
          </div>
          <div>
            <p className="font-bold">Email Address</p>
            <p>{inquiries.email}</p>
          </div>
          <div>
            <p className="font-bold">Phone Number</p>
            <p>{inquiries.phone}</p>
          </div>
          <div>
            <p className="font-bold">Company Name</p>
            <p>{inquiries.company}</p>
          </div>
          <div>
            <p className="font-bold">Country</p>
            <p>{inquiries.country}</p>
          </div>
          <div>
            <p className="font-bold">Job Title</p>
            <p>{inquiries.jobTitle}</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold">Job Details</p>
            <p>{inquiries.jobDetails}</p>
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
