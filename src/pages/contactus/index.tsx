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
  const countries = countryList().getData();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Contact Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            an.
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <Card className="shadow-lg p-6">
          <CardContent>
            <form className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Enter your name" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="Enter your phone" />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              {/* Company Name & Country Dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input type="text" placeholder="Enter your company name" />
                </div>
                <div>
                  <Label>Country</Label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select a country"
                    className="w-full text-black"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <Label>Job Title</Label>
                <Input type="text" placeholder="Enter your job title" />
              </div>

              {/* Job Details */}
              <div>
                <Label>Job Details</Label>
                <Textarea placeholder="Enter job details" rows={4} />
              </div>

              {/* Submit Button */}
              <Button className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
