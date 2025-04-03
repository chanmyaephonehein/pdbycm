import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function Contact() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    jobTitle: "",
    jobDetails: "",
  });

  const countries = countryList().getData();

  const handleInputChange = (field: string, value: string) => {
    setNewInquiry((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateInquiry = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });

      if (!response.ok) return alert("Failed to create inquiry");
      // throw new Error("Failed to create inquiry");
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
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Contact Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            We'd love to hear from you. Whether you have a question about our
            solutions, need assistance, or just want to give feedback — our team
            is ready to help.
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <Card className="shadow-lg p-6">
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Name & Phone */}
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
                  <Input
                    type="tel"
                    placeholder="Enter your phone"
                    value={newInquiry.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newInquiry.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              {/* Company Name & Country Dropdown */}
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

              {/* Job Title */}
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

              {/* Job Details */}
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

              {/* Submit Button */}
              <Button className="w-full" onClick={handleCreateInquiry}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
