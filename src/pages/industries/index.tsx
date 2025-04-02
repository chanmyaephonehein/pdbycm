import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const industries = [
  {
    name: "Banking & Finance",
    route: "/industries/banking-finance",
    description:
      "AI is reshaping finance through fraud detection, algorithmic trading, customer insights, and automated risk management. Discover smarter ways to manage wealth and enhance financial security.",
  },
  {
    name: "Healthcare & Life Sciences",
    route: "/industries/healthcare",
    description:
      "From diagnostics to personalized medicine, AI empowers healthcare providers to deliver faster, more accurate, and proactive patient care while optimizing resources and reducing costs.",
  },
  {
    name: "Retail & Ecommerce",
    route: "/industries/retail-ecommerce",
    description:
      "Leverage AI for demand forecasting, personalized shopping experiences, customer support chatbots, and smarter inventory management to boost sales and customer loyalty.",
  },
  {
    name: "Manufacturing & Engineering",
    route: "/industries/manufacturing",
    description:
      "Transform your production line with predictive maintenance, quality control automation, and AI-driven design simulation for more efficient, adaptive, and scalable operations.",
  },
  {
    name: "IT & Software Development",
    route: "/industries/it-software",
    description:
      "Speed up development with AI-powered code generation, intelligent testing, and project management tools. Improve efficiency, reliability, and innovation across the tech stack.",
  },
  {
    name: "Human Resources & Workforce Management",
    route: "/industries/human-resources",
    description:
      "Use AI to streamline recruitment, analyze workforce trends, boost employee engagement, and ensure better talent retention through predictive people analytics.",
  },
];

const ourColls = [
  "/image14.webp",
  "/image15.jpg",
  "/image16.jpg",
  "/image17.webp",
];

export default function Industries() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Revolutionizing Industries with AI
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        At AI-Solution, we specialize in integrating artificial intelligence
        into critical industry sectors to streamline operations, improve
        customer engagement, and unlock new levels of productivity. Explore how
        we help businesses adapt, grow, and lead through smart technology.
      </p>

      {/* Industry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, index) => (
          <Link href={industry.route} key={index}>
            <Card className="p-4 border rounded-xl shadow-md hover:shadow-lg transition duration-200 hover:border-black h-full">
              <CardContent>
                <h2 className="text-xl font-semibold">{industry.name}</h2>
                <p className="text-gray-600 text-sm mt-2">
                  {industry.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* How AI is Changing Industries */}
      <section className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          How AI Is Transforming These Industries
        </h2>
        <p className="text-gray-600 mb-8">
          From predictive analytics in finance to intelligent diagnostics in
          healthcare, AI is driving transformation at an unprecedented pace.
          Whether it’s improving operational efficiency, boosting revenue, or
          enhancing user experiences, AI has become a powerful tool for
          strategic innovation. Here's what AI brings across sectors:
        </p>
        <ul className="text-left grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <li>✅ Intelligent automation to reduce costs and save time</li>
          <li>✅ Real-time data analysis for better decision-making</li>
          <li>✅ Enhanced customer experience through personalization</li>
          <li>✅ Predictive modeling to forecast trends and risks</li>
          <li>✅ AI-driven design and development in manufacturing</li>
          <li>✅ Smart resource allocation and workforce optimization</li>
        </ul>
      </section>

      {/* Collaborators Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mt-20 mb-6">
          Our Collaborators
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          We work with global leaders, startups, and innovators to deliver
          impactful AI-powered solutions. Together, we’re shaping the future of
          industries.
        </p>

        {/* Grid here */}
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ourColls.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={item}
              alt={`Collaborator ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold mb-2">
          Ready to bring AI into your industry?
        </h3>
        <p className="text-gray-600">
          Contact us today to learn how our tailored AI solutions can help your
          business thrive in a data-driven future.
        </p>
        <Link href="/contactus">
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
