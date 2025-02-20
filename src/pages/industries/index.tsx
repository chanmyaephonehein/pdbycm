import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const industries = [
  "Banking & Finance",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Transportation",
  "Education",
];

export default function Industries() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Revolutionizing Industries with AI
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover how AI-Solution transforms businesses across multiple
        industries with innovative AI-driven solutions.
      </p>

      {/* Industry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, index) => (
          <Card key={index} className="p-4 border rounded-xl shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold">{industry}</h2>
              <p className="text-gray-600 text-sm mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard dummy
                text since the 1500s.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collaborators Section */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-6">
        Our Collaborators
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Image
            key={index}
            src="/sample.jpg"
            alt=""
            width={400}
            height={300}
            className="object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
