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

// Dummy content (same for all pages for now)
const solutionDetails = {
  title: "AI Solution Details",
  description:
    "This AI-powered solution provides automation, intelligence, and efficiency for various industries. Enhance customer experience, optimize workflows, and drive innovation with state-of-the-art AI technology.",
  image: "/sample.jpg",
  benefits: [
    {
      title: "Automation & Efficiency",
      content:
        "Reduce manual work and increase efficiency with AI-driven automation.",
    },
    {
      title: "Predictive Insights",
      content: "Leverage AI analytics for data-driven decision-making.",
    },
    {
      title: "Scalability",
      content:
        "Easily scale your business operations with AI-powered solutions.",
    },
  ],
};

export default function SolutionDetail({
  params,
}: {
  params: { slug: string };
}) {
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
          <p className="text-gray-600">{solutionDetails.description}</p>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/contactus");
            }}
          >
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
      <Card className="mt-8">
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
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold mb-2">Want to learn more?</h3>
        <p className="text-gray-600">
          Contact us today to explore AI-powered solutions.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            router.push("/contactus");
          }}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}
