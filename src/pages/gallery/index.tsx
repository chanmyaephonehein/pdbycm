import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const promotionalEvents = [
  {
    id: 1,
    name: "Event 1",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
  {
    id: 2,
    name: "Event 2",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
  {
    id: 3,
    name: "Event 3",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
];

const productDemos = [
  {
    id: 4,
    name: "Demo 1",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
  {
    id: 5,
    name: "Demo 2",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
  {
    id: 6,
    name: "Demo 3",
    description: "Lorem Ipsum is simply dummy text.",
    image: "/sample.jpg",
  },
];

export default function Gallery() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const prevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === 0 ? promotionalEvents.length - 1 : prev - 1
    );
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === promotionalEvents.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h2 className="text-3xl font-semibold mb-4">Our Gallery</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-12">
        Discover how AI-Solution transforms businesses across multiple
        industries with innovative AI-driven solutions.
      </p>

      {/* Promotional Events - Carousel */}
      <h3 className="text-2xl font-semibold mb-6">Promotional Events</h3>
      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className="md:block"
          onClick={prevEvent}
        >
          ←
        </Button>

        {/* Display Current Event */}
        <div className="border rounded-lg p-4 shadow-md w-80">
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center mb-4">
            <Image
              src={promotionalEvents[currentEventIndex].image}
              alt={promotionalEvents[currentEventIndex].name}
              width={300}
              height={200}
              className="object-cover rounded-md"
            />
          </div>
          <p className="text-gray-600">
            {promotionalEvents[currentEventIndex].description}
          </p>
          <h4 className="text-lg font-semibold mt-2">
            {promotionalEvents[currentEventIndex].name}
          </h4>
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className=" md:block"
          onClick={nextEvent}
        >
          →
        </Button>
      </div>

      {/* Product Demos - Grid */}
      <h3 className="text-2xl font-semibold mt-12 mb-6">Product Demos</h3>
      <div className="flex flex-wrap justify-center md:grid md:grid-cols-3 gap-6">
        {productDemos.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md text-center w-fit mx-auto"
          >
            <div className="w-full h-40 flex items-center justify-center mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-gray-600">{product.description}</p>
            <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
