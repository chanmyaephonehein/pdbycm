import Image from "next/image";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    title: "AI-Powered Virtual Assistants & Chatbots",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
  },
  {
    title: "AI-Driven Automation & Process Optimization",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
  },
  {
    title: "Predictive Analytics & Business Intelligence",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
  },
  {
    title: "AI-Based Prototyping & Product Development",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
  },
  {
    title: "AI for Cybersecurity & Risk Management",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
  },
  {
    title: "AI-Powered Personalization & Customer Experience",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/placeholder.png",
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
            className={`flex flex-col md:flex-row items-center   ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center ">
              <Image
                src="/sample.jpg"
                alt={solution.title}
                width={400}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 lg:w-5/12 text-center md:text-left">
              <h3 className="text-xl font-semibold">{solution.title}</h3>
              <p className="mt-2 text-gray-600">{solution.description}</p>
              <Button className="mt-4">Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
