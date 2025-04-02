"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bot, Workflow, LineChart, CheckCircle } from "lucide-react";

const Home = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-36">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold">AI-Solution</h1>
          <h2 className="text-2xl font-medium mt-2">
            Smarter Decisions, Seamless Operations
          </h2>
          <p className="mt-4 text-gray-600">
            We build intelligent software that empowers organizations to
            automate workflows, deliver personalized experiences, and make
            faster, data-driven decisions — powered by advanced AI.
          </p>
          <p className="mt-2 text-sm text-gray-500 italic">
            Trusted by teams across industries — from finance to healthcare.
          </p>
          <Button className="mt-6" onClick={() => router.push("/contactus")}>
            Contact Us
          </Button>
        </div>
        <div className="mt-6 lg:mt-0">
          <Image
            src="/sample.jpg"
            alt="AI Hero"
            width={500}
            height={360}
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          AI-Solution aims to redefine how businesses operate in a digital
          world. Through cutting-edge AI tools and automation, we help companies
          unlock innovation, boost productivity, and stay ahead of the
          competition.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold">
          Empowering Businesses with AI
        </h3>
        <p className="text-gray-600 mt-2 mb-10 max-w-xl mx-auto">
          Explore our core AI offerings that help you automate, scale, and make
          smarter decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Bot className="w-8 h-8 text-black" />
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Assistants</h4>
              <p className="text-gray-600 mt-2">
                Automate customer support and employee workflows with
                intelligent virtual agents.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Workflow className="w-8 h-8 text-black" />
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Automation</h4>
              <p className="text-gray-600 mt-2">
                Streamline operations, reduce manual work, and boost team
                productivity.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <LineChart className="w-8 h-8 text-black" />
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Insights</h4>
              <p className="text-gray-600 mt-2">
                Use predictive analytics to uncover trends and make confident,
                data-driven decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-24 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Why Choose AI-Solution?</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500 mt-1" />
            Cutting-edge AI tailored to your business challenges
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500 mt-1" />
            Proven success across industries like finance, retail, and
            healthcare
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500 mt-1" />
            Dedicated support and smooth onboarding
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500 mt-1" />
            Scalable architecture built for future growth
          </li>
        </ul>
      </div>

      {/* Testimonials */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-semibold mb-6">What Our Clients Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="py-6 px-4 flex flex-col items-center justify-between text-center h-full">
            <Avatar className="w-16 h-16 mb-4">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div className="flex gap-1 text-yellow-500 mb-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z" />
                  </svg>
                ))}
            </div>
            <p className="text-gray-700 text-sm mb-4">
              AI-Solution helped automate our processes, saving us hours of
              manual work. Their team is incredibly responsive and truly
              understands business needs.
            </p>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">COO, TechNova</p>
          </Card>

          <Card className="py-6 px-4 flex flex-col items-center justify-between text-center h-full">
            <Avatar className="w-16 h-16 mb-4">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div className="flex gap-1 text-yellow-500 mb-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z" />
                  </svg>
                ))}
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Their AI solutions enhanced our customer experience significantly!
              We saw instant results and better customer satisfaction scores.
            </p>
            <p className="font-semibold">Jane Smith</p>
            <p className="text-sm text-gray-500">
              VP of Customer Experience, RetailHub
            </p>
          </Card>

          <Card className="py-6 px-4 flex flex-col items-center justify-between text-center h-full">
            <Avatar className="w-16 h-16 mb-4">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex gap-1 text-yellow-500 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ${
                    i <= 4 ? "fill-yellow-400" : "text-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                  fill={i <= 4 ? "currentColor" : "none"}
                >
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-4">
              We’ve seen a 30% efficiency increase thanks to AI-Solution’s
              automation technology. Game changer for our internal ops.
            </p>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-sm text-gray-500">Operations Manager, FinSync</p>
          </Card>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="mt-24 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Trusted by forward-thinking teams
        </h3>
        <div className="flex justify-center flex-wrap gap-6">
          {[
            "/image18.png",
            "/image19.webp",
            "/image20.png",
            "/image21.png",
          ].map((logo, i) => (
            <Image
              key={i}
              src={logo}
              alt={`Logo ${i + 1}`}
              width={120}
              height={60}
              className="object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
