"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { config } from "@/config";

export default function Contact() {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    jobTitle: "",
    jobDetails: "",
  });

  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const countries = countryList().getData();

  const handleInputChange = (field: string, value: string) => {
    setNewInquiry((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { email?: string; phone?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newInquiry.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!isValidPhoneNumber(newInquiry.phone || "")) {
      newErrors.phone = "Invalid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateInquiry = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });

      if (!response.ok) {
        alert("Failed to create inquiry");
        setSubmitting(false);
        return;
      }

      setNewInquiry({
        name: "",
        email: "",
        phone: "",
        country: "",
        companyName: "",
        jobTitle: "",
        jobDetails: "",
      });

      setSelectedCountry(null);
      alert("Inquiry submitted successfully!");
    } catch (error) {
      console.error("Error creating inquiry:", error);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            We'd love to hear from you. Whether you have a question about our
            solutions, need assistance, or just want to give feedback — our team
            is ready to help.
          </p>
        </div>

        {/* Right Section */}
        <Card className="shadow-lg p-6">
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={newInquiry.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={newInquiry.phone}
                    onChange={(value) =>
                      handleInputChange("phone", value || "")
                    }
                    country={selectedCountry?.value || undefined}
                    className="w-full border border-gray-300 p-2 rounded-md text-sm"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newInquiry.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your company name"
                    value={newInquiry.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={(selected) => {
                      setSelectedCountry(selected);
                      handleInputChange("country", selected?.label || "");
                    }}
                    placeholder="Select a country"
                    className="w-full text-black"
                  />
                </div>
              </div>

              <div>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  placeholder="Enter your job title"
                  value={newInquiry.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Job Details</Label>
                <Textarea
                  placeholder="Enter job details"
                  rows={4}
                  value={newInquiry.jobDetails}
                  onChange={(e) =>
                    handleInputChange("jobDetails", e.target.value)
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleCreateInquiry}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
