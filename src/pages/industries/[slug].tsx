import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Sample Industry Data (Instant, No `params` Fetching)
const industry = {
  title: "AI in Banking & Finance",
  description:
    "AI-driven solutions are revolutionizing the financial sector, enhancing fraud detection, risk management, and customer service automation.",
  image: "/sample.jpg",
  useCases: [
    {
      title: "Fraud Detection",
      content:
        "AI analyzes transactions in real-time to detect and prevent fraud.",
    },
    {
      title: "Automated Loan Processing",
      content: "AI speeds up loan approvals and risk assessments.",
    },
    {
      title: "Personalized Banking",
      content: "Chatbots provide instant assistance and financial insights.",
    },
  ],
};

export default function IndustryDetail() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Back Button */}
      <Link href="/industries">
        <Button variant="outline" className="mb-6">
          ← Back to Industries
        </Button>
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">{industry.title}</h2>
          <p className="text-gray-600">{industry.description}</p>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/contactus");
            }}
          >
            Learn More
          </Button>
        </div>
        <div>
          <Image
            src={industry.image}
            alt={industry.title}
            width={500}
            height={350}
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      </div>

      {/* Use Cases Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How AI is Transforming {industry.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="use-cases">
            <TabsList className="flex justify-center space-x-2">
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            {/* Use Cases */}
            <TabsContent value="use-cases">
              <ul className="mt-4 space-y-3">
                {industry.useCases.map((useCase, index) => (
                  <li key={index} className="border-b pb-2">
                    <h4 className="font-semibold">{useCase.title}</h4>
                    <p className="text-gray-600">{useCase.content}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* Benefits */}
            <TabsContent value="benefits">
              <ul className="mt-4 space-y-3">
                <li className="border-b pb-2">
                  <h4 className="font-semibold">Increased Efficiency</h4>
                  <p className="text-gray-600">
                    AI automates tasks, reducing human workload.
                  </p>
                </li>
                <li className="border-b pb-2">
                  <h4 className="font-semibold">Data-Driven Insights</h4>
                  <p className="text-gray-600">
                    AI helps businesses make better strategic decisions.
                  </p>
                </li>
                <li className="border-b pb-2">
                  <h4 className="font-semibold">
                    Improved Customer Experience
                  </h4>
                  <p className="text-gray-600">
                    AI chatbots and personalized services improve engagement.
                  </p>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold mb-2">
          Want to explore AI solutions for your industry?
        </h3>
        <p className="text-gray-600">
          Contact us today to see how AI can transform your business.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            router.push("/contactus");
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
