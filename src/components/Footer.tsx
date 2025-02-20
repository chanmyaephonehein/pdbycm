"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start text-center md:text-left">
        {/* Left - Brand Name */}
        <div className="mb-6 lg:mb-0">
          <h2
            className="text-lg font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            AI-Solution.com
          </h2>
        </div>

        {/* Right Section - Solutions, Industries & Company */}
        <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:gap-16 text-center lg:text-left">
          {/* Solutions */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Solutions</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/ai-chatbots")}
              >
                AI-Powered Virtual Assistants & Chatbots
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/ai-automation")}
              >
                AI-Driven Automation & Process Optimization
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/predictive-analytics")}
              >
                Predictive Analytics & Business Intelligence
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/ai-prototyping")}
              >
                AI-Based Prototyping & Product Development
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/ai-cybersecurity")}
              >
                AI for Cybersecurity & Risk Management
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/solutions/ai-personalization")}
              >
                AI-Powered Personalization & Customer Experience
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Industries</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/banking-finance")}
              >
                Banking & Finance
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/retail-ecommerce")}
              >
                Retail & Ecommerce
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/healthcare")}
              >
                Healthcare & Life Sciences
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/it-software")}
              >
                IT & Software Development
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/manufacturing")}
              >
                Manufacturing & Engineering
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/industries/human-resources")}
              >
                Human Resources & Workforce Management
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Company</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/about")}
              >
                About Us
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/contactus")}
              >
                Contact Us
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </li>
              <li
                className="cursor-pointer hover:text-gray-300"
                onClick={() => router.push("/terms-of-service")}
              >
                Terms of Service
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        © AI-Solution.com copyright 2025
      </div>
    </footer>
  );
};

export default Footer;
