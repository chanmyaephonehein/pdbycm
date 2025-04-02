import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    title: "AI-Powered Virtual Assistants & Chatbots",
    route: "/solutions/ai-chatbots",
    image: "/image1.jpg",
    description:
      "Revolutionize the way you engage with customers through AI-powered virtual assistants and chatbots that deliver instant, accurate, and human-like responses around the clock. These intelligent bots can automate customer service, reduce wait times, handle repetitive queries, and even learn over time to provide smarter support, improving satisfaction and reducing operational costs.",
  },
  {
    title: "AI-Driven Automation & Process Optimization",
    route: "/solutions/ai-automation",
    image: "/image2.jpg",
    description:
      "Empower your organization with smart automation tools that harness artificial intelligence to eliminate inefficiencies, optimize workflows, and reduce manual intervention. From data entry to decision-making, AI can transform business operations by increasing accuracy, saving time, and enabling teams to focus on higher-value tasks.",
  },
  {
    title: "Predictive Analytics & Business Intelligence",
    route: "/solutions/predictive-analytics",
    image: "/image3.png",
    description:
      "Unlock the power of your data with AI-driven predictive analytics and business intelligence solutions. These tools analyze historical and real-time data to identify patterns, forecast trends, and uncover actionable insights. Make data-informed decisions that boost performance, reduce risk, and give you a competitive advantage.",
  },
  {
    title: "AI-Based Prototyping & Product Development",
    route: "/solutions/ai-prototyping",
    image: "/image4.jpg",
    description:
      "Accelerate your product development lifecycle with AI-assisted prototyping that enables rapid design iteration, simulation, and testing. Whether you're launching a new product or refining an existing one, AI can streamline the development process by identifying flaws early, optimizing performance, and reducing time to market.",
  },
  {
    title: "AI for Cybersecurity & Risk Management",
    route: "/solutions/ai-cybersecurity",
    image: "/image5.png",
    description:
      "Deliver hyper-personalized customer journeys with AI that understands individual preferences, behaviors, and intent. From dynamic content recommendations to tailored marketing messages, AI enhances every touchpoint, boosting engagement, conversion rates, and brand loyalty through meaningful interactions.",
  },
  {
    title: "AI-Powered Personalization & Customer Experience",
    route: "/solutions/ai-personalization",
    image: "/image6.jpg",
    description:
      "Deliver customized experiences by leveraging AI to understand user behavior, tailor content, and drive higher engagement and conversions.",
  },
];

export default function Solutions() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Offered AI Solutions
      </h2>

      <div className="flex flex-col gap-16">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src={solution.image}
                alt={solution.title}
                width={400}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-5/12 text-center md:text-left">
              <h3 className="text-xl font-semibold">{solution.title}</h3>
              <p className="mt-2 text-gray-600">{solution.description}</p>
              <Link href={solution.route}>
                <Button className="mt-4">Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Us CTA Section */}
      <div className="text-center mt-24">
        <h3 className="text-2xl font-semibold mb-2">
          Want to implement AI in your business?
        </h3>
        <p className="text-gray-600 mb-4 max-w-xl mx-auto">
          Contact us today and discover how our tailored AI solutions can solve
          your biggest challenges and unlock new growth opportunities.
        </p>
        <Link href="/contactus">
          <Button className="mt-2">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
