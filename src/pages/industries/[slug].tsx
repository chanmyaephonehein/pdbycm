import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Static industry data
const industry = {
  title: "AI in Banking & Finance",
  description: `
Artificial Intelligence is revolutionizing the banking and finance sector by enabling smarter, faster, and more secure operations. From personalized customer service and fraud detection to automated investment advisory and loan processing, AI is reshaping how financial institutions operate and interact with clients.

With the ever-increasing volume of financial data and rising customer expectations, AI allows organizations to stay ahead of the curve through predictive analytics, process automation, and enhanced security. This transformation is helping financial institutions reduce costs, mitigate risks, improve compliance, and gain a competitive edge.
  `,
  image: "/image7.jpeg",
  useCases: [
    {
      title: "Fraud Detection",
      content:
        "AI monitors transactions in real-time, identifying suspicious patterns and preventing fraudulent activities before they cause damage.",
    },
    {
      title: "Automated Loan Processing",
      content:
        "AI analyzes creditworthiness, automates documentation review, and accelerates loan approvals with greater accuracy and fewer errors.",
    },
    {
      title: "Personalized Banking",
      content:
        "AI-powered chatbots and virtual assistants offer tailored financial advice, product recommendations, and 24/7 customer support.",
    },
    {
      title: "Algorithmic Trading",
      content:
        "AI systems process market data at lightning speed to make optimized trading decisions, increasing profitability and reducing risk.",
    },
    {
      title: "Risk Management & Compliance",
      content:
        "AI helps financial institutions identify risks, monitor regulatory compliance, and generate reports for auditors and regulators automatically.",
    },
  ],
  benefits: [
    {
      title: "Increased Efficiency",
      content:
        "AI eliminates repetitive manual tasks, freeing up staff for high-value activities and reducing operational costs.",
    },
    {
      title: "Data-Driven Insights",
      content:
        "AI turns vast financial data into actionable intelligence, supporting faster, evidence-based decision-making.",
    },
    {
      title: "Improved Customer Experience",
      content:
        "Hyper-personalized banking experiences boost engagement, loyalty, and customer satisfaction.",
    },
    {
      title: "Enhanced Security & Fraud Prevention",
      content:
        "AI actively detects anomalies and threats in real time, ensuring secure and trustworthy financial transactions.",
    },
    {
      title: "Real-Time Decision Making",
      content:
        "Financial institutions can make real-time credit and investment decisions based on dynamic data inputs.",
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
          <p className="text-gray-600 whitespace-pre-line">
            {industry.description}
          </p>
          <Button className="mt-6" onClick={() => router.push("/contactus")}>
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
      <Card className="mt-10">
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
              <ul className="mt-4 space-y-4">
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
              <ul className="mt-4 space-y-4">
                {industry.benefits.map((benefit, index) => (
                  <li key={index} className="border-b pb-2">
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.content}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Why It Matters */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">
          Why AI Matters in Banking & Finance
        </h3>
        <p className="text-gray-600 mb-6">
          As customer expectations rise and financial operations become
          increasingly complex, adopting AI is no longer optional—it’s
          essential. Banks and financial institutions that embrace AI will
          benefit from greater agility, better compliance, and stronger customer
          trust.
        </p>
        <p className="text-gray-600">
          From fintech startups to global banks, AI is redefining how financial
          services are designed, delivered, and optimized. The time to invest in
          intelligent transformation is now.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold mb-2">
          Want to explore AI solutions for your financial business?
        </h3>
        <p className="text-gray-600">
          Contact us today to discover how AI can give you a competitive edge in
          the financial world.
        </p>
        <Button className="mt-4" onClick={() => router.push("/contactus")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
