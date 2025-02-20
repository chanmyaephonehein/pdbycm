import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start text-center md:text-left">
        {/* Left - Brand Name */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold">AI-Solution.com</h2>
        </div>

        {/* Right Section - Solutions, Industries & Company */}
        <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:gap-16 text-center lg:text-left">
          {/* Solutions */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Solutions</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li>AI-Powered Virtual Assistants & Chatbots</li>
              <li>AI-Driven Automation & Process Optimization</li>
              <li>Predictive Analytics & Business Intelligence</li>
              <li>AI-Based Prototyping & Product Development</li>
              <li>AI for Cybersecurity & Risk Management</li>
              <li>AI-Powered Personalization & Customer Experience</li>
            </ul>
          </div>

          {/* Industries */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Industries</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li>Banking & Finance</li>
              <li>Retail & Ecommerce</li>
              <li>Healthcare & Life Sciences</li>
              <li>IT & Software Development</li>
              <li>Manufacturing & Engineering</li>
              <li>Human Resources & Workforce Management</li>
            </ul>
          </div>

          {/* Company */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-md font-semibold">Company</h3>
            <ul className="mt-2 space-y-1 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
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
