import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "COO, TechNova",
    feedback:
      "AI-Solution helped automate our processes, saving us hours of manual work. Their team is incredibly responsive and truly understands business needs.",
    rating: 5,
    image: "/profile-placeholder.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "VP of Customer Experience, RetailHub",
    feedback:
      "Their AI solutions enhanced our customer experience significantly! We saw instant results and better customer satisfaction scores.",
    rating: 5,
    image: "/profile-placeholder.png",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Operations Manager, FinSync",
    feedback:
      "We’ve seen a 30% efficiency increase thanks to AI-Solution’s automation technology. Game changer for our internal ops.",
    rating: 4,
    image: "/profile-placeholder.png",
  },
  {
    id: 4,
    name: "Sophia Lee",
    role: "CEO, HealthNet AI",
    feedback:
      "The best AI solution provider we’ve worked with! Their support and delivery were world-class.",
    rating: 5,
    image: "/profile-placeholder.png",
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Head of IT, CargoLink",
    feedback:
      "Their AI automation reduced our workload significantly and improved our tracking systems.",
    rating: 4,
    image: "/profile-placeholder.png",
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Digital Strategy Lead, FlowBank",
    feedback:
      "We saw a massive boost in customer satisfaction after implementing their AI chatbot. Highly recommend.",
    rating: 5,
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

  const renderStars = (count: number) => {
    return (
      <div className="flex justify-center gap-1 mt-2 text-yellow-500">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <Star
              key={idx}
              className={`w-4 h-4 ${
                idx < count ? "fill-yellow-400" : "text-gray-300"
              }`}
              fill={idx < count ? "currentColor" : "none"}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">AI-SOLUTION</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        What Our Clients Say
      </h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        We collaborate with businesses across industries to implement powerful
        AI tools that deliver real results. Here's what our clients have to say
        about the transformation they experienced after partnering with
        AI-Solution.
      </p>
      {/* Mobile View */}
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
            {renderStars(testimonials[currentIndex].rating)}
            <p className="text-gray-600 mt-3">
              {testimonials[currentIndex].feedback}
            </p>
            <CardTitle className="mt-4">
              {testimonials[currentIndex].name}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {testimonials[currentIndex].role}
            </p>
          </CardContent>
        </Card>

        <Button variant="outline" size="icon" onClick={nextFeedback}>
          →
        </Button>
      </div>
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={prevFeedback}>
          ←
        </Button>

        <div className="grid grid-cols-3 gap-6">
          {testimonials
            .concat(testimonials)
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
                  {renderStars(testimonial.rating)}
                  <p className="text-gray-600 mt-3">{testimonial.feedback}</p>
                  <CardTitle className="mt-4">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextFeedback}>
          →
        </Button>
      </div>{" "}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h4 className="text-xl font-semibold mb-2">
          Ready to share your story?
        </h4>
        <p className="text-gray-600 mb-4">
          We value every partnership. If you're a current client and would like
          to be featured here, get in touch with us. Your success inspires
          others.
        </p>
        <Link href="/contactus">
          <Button>Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
