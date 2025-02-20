import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback:
      "AI-Solution helped automate our processes, saving us hours of manual work.",
    image: "/profile-placeholder.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback:
      "Their AI solutions enhanced our customer experience significantly!",
    image: "/profile-placeholder.png",
  },
  {
    id: 3,
    name: "Alex Johnson",
    feedback:
      "We’ve seen a 30% efficiency increase thanks to AI-Solution’s technology.",
    image: "/profile-placeholder.png",
  },
  {
    id: 4,
    name: "Sophia Lee",
    feedback: "The best AI solution provider we’ve worked with!",
    image: "/profile-placeholder.png",
  },
  {
    id: 5,
    name: "Michael Brown",
    feedback: "Their AI automation reduced our workload significantly.",
    image: "/profile-placeholder.png",
  },
  {
    id: 6,
    name: "Emily Davis",
    feedback:
      "We saw a massive boost in customer satisfaction after implementing their AI chatbot.",
    image: "/profile-placeholder.png",
  },
];

export default function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevFeedback = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextFeedback = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">AI-SOLUTION</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-8">
        What Our Clients Say
      </h3>

      {/* Mobile View - Show 1 Testimonial at a Time */}
      <div className="md:hidden flex flex-row items-center gap-4">
        <Button variant="outline" size="icon" onClick={prevFeedback}>
          ←
        </Button>

        <Card className="w-80 text-center">
          <CardHeader>
            <Avatar className="w-16 h-16 mx-auto">
              <AvatarImage src={testimonials[currentIndex].image} />
              <AvatarFallback>
                {testimonials[currentIndex].name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {testimonials[currentIndex].feedback}
            </p>
            <CardTitle className="mt-4">
              {testimonials[currentIndex].name}
            </CardTitle>
          </CardContent>
        </Card>

        <Button variant="outline" size="icon" onClick={nextFeedback}>
          →
        </Button>
      </div>

      {/* Desktop View - Show 3 Testimonials at a Time */}
      <div className="hidden md:flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={prevFeedback}>
          ←
        </Button>

        <div className="grid grid-cols-3 gap-6">
          {testimonials
            .concat(testimonials) // Creates a looping effect
            .slice(currentIndex, currentIndex + 3)
            .map((testimonial) => (
              <Card key={testimonial.id} className="text-center">
                <CardHeader>
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{testimonial.feedback}</p>
                  <CardTitle className="mt-4">{testimonial.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextFeedback}>
          →
        </Button>
      </div>
    </div>
  );
}
