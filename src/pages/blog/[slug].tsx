"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";

const blogPost = {
  title: "How Artificial Intelligence is Transforming the Future of Work",
  author: "Evelyn Carter",
  role: "AI Strategist, FutureTech Insights",
  date: "April 3, 2025",
  description:
    "AI is no longer a futuristic concept — it's actively reshaping how we work, communicate, and solve problems. Discover how AI is revolutionizing industries, empowering employees, and redefining productivity.",
  image: "/image22.png",
  content: [
    {
      heading: "Smarter Workflows, Less Repetition",
      text: "AI-powered systems are eliminating manual, repetitive tasks — from scheduling meetings to handling emails. Employees now spend more time on innovation, strategy, and high-impact responsibilities.",
    },
    {
      heading: "Real-Time, Data-Driven Decisions",
      text: "AI enables leaders to make faster, more accurate decisions by analyzing massive datasets in seconds. Predictive analytics provides insights into customer behavior, market trends, and business performance.",
    },
    {
      heading: "Personalized Work Environments",
      text: "AI creates tailored employee experiences. From onboarding chatbots to intelligent learning platforms that adapt to each user, AI is elevating employee satisfaction and performance at scale.",
    },
    {
      heading: "AI + Human Creativity = Future Work",
      text: "AI isn’t replacing humans — it’s enhancing human capabilities. As machines handle routine tasks, demand grows for skills like critical thinking, emotional intelligence, and problem-solving.",
    },
    {
      heading: "Preparing for the AI-Powered Workplace",
      text: "Forward-thinking organizations are investing in AI training and digital skills. Embracing AI means embracing evolution — not job loss, but smarter roles and more empowered teams.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: blogPost.title,
    description: blogPost.description,
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      images: [{ url: blogPost.image }],
    },
  };
}

export default function BlogDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/blog">
        <Button variant="outline" className="mb-6">
          ← Back to Blog
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold">{blogPost.title}</CardTitle>
          <p className="text-gray-600 mt-2">{blogPost.description}</p>

          <div className="mt-4 flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/profile-placeholder.png" alt="Author" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blogPost.author}</p>
              <p className="text-sm text-gray-500">
                {blogPost.role} • {blogPost.date}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 text-gray-800 leading-relaxed">
          <div className="flex justify-center overflow-x-auto">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              width={900}
              height={500}
              className="rounded-lg shadow-md"
            />
          </div>

          <Separator />

          <p className="text-lg text-gray-700">
            Artificial Intelligence is no longer a buzzword. It's here, it's
            real, and it's revolutionizing how we work — enhancing productivity,
            reshaping roles, and enabling smarter decision-making.
          </p>

          {blogPost.content.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2 text-black">
                {section.heading}
              </h3>
              <p className="text-gray-700">{section.text}</p>
            </div>
          ))}

          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-blue-50 p-4 rounded-md">
            “AI won’t take your job — but someone who uses AI might.” — Unknown
          </blockquote>
        </CardContent>
      </Card>

      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold mb-2">Enjoyed this read?</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Stay informed and get expert insights on how AI is shaping the modern
          workplace.
        </p>
        <Link href="/contactus">
          <Button className="mt-6">Talk to Our AI Experts</Button>
        </Link>
      </div>
    </div>
  );
}
