import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const solutionDetails = {
  title: "AI-Powered Virtual Assistants & Chatbots",
  image: "/image1.jpg", // Replace with your actual image
  description:
    "AI-powered virtual assistants and chatbots are transforming how businesses interact with customers and manage internal tasks. These systems use advanced natural language processing (NLP) and machine learning algorithms to provide intelligent, human-like interactions 24/7. Whether it's handling customer inquiries, scheduling appointments, or assisting with product selection, AI chatbots can do it all—faster, cheaper, and without burnout.\n\nBy implementing these smart systems, companies can reduce operational costs, deliver faster resolutions, and maintain consistent service quality. Over time, they learn from user interactions and continuously improve, offering personalized responses that boost engagement and satisfaction.",
  benefits: [
    {
      title: "24/7 Customer Engagement",
      content:
        "Provide immediate support to your users at any time of the day. AI chatbots never sleep, ensuring round-the-clock service availability.",
    },
    {
      title: "Cost Reduction",
      content:
        "Lower customer support and operations expenses by reducing the need for large human agent teams handling repetitive queries.",
    },
    {
      title: "Scalable Support",
      content:
        "Easily handle thousands of simultaneous conversations without affecting response time or service quality.",
    },
    {
      title: "Consistent Brand Messaging",
      content:
        "Ensure every customer receives accurate, standardized responses that align with your company’s tone and policies.",
    },
    {
      title: "Multilingual Capabilities",
      content:
        "Break language barriers and serve a global customer base using multilingual chatbot capabilities.",
    },
    {
      title: "Data Collection & Insights",
      content:
        "Track user behavior, identify trends, and gather actionable feedback to continuously improve your services and strategies.",
    },
  ],
};

export default function ChatbotSolution() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Back Button */}
      <Link href="/solutions">
        <Button variant="outline" className="mb-6">
          ← Back to Solutions
        </Button>
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            {solutionDetails.title}
          </h2>
          <p className="text-gray-600 whitespace-pre-line">
            {solutionDetails.description}
          </p>
          <Button className="mt-6" onClick={() => router.push("/contactus")}>
            Get Started
          </Button>
        </div>
        <div>
          <Image
            src={solutionDetails.image}
            alt={solutionDetails.title}
            width={500}
            height={350}
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Why Choose This AI Solution?</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {solutionDetails.benefits.map((benefit, index) => (
              <AccordionItem key={index} value={`benefit-${index}`}>
                <AccordionTrigger>{benefit.title}</AccordionTrigger>
                <AccordionContent>{benefit.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold mb-2">
          Want to implement AI chatbots for your business?
        </h3>
        <p className="text-gray-600">
          Reach out to us today and discover how AI assistants can transform
          your customer experience.
        </p>
        <Button className="mt-4" onClick={() => router.push("/contactus")}>
          Contact Us
        </Button>
      </div>
    </div>
  );
}
