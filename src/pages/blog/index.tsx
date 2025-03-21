"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Function to create a slug from the title
const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const blogCategories = [
  {
    category: "AI Industry Trends & Insight",
    blogs: [
      {
        title: "How AI is Transforming the Future of Work",
        description:
          "Explore how AI is reshaping the workplace and improving efficiency.",
        image: "/sample.jpg",
      },
      {
        title: "Top 5 AI Trends in 2025",
        description:
          "Discover the top AI trends that will dominate in the coming years.",
        image: "/sample.jpg",
      },
      {
        title: "The Role of AI in Digital Employee Experience",
        description: "How AI enhances employee engagement and productivity.",
        image: "/sample.jpg",
      },
    ],
  },
  {
    category: "Case Studies & Success Stories",
    blogs: [
      {
        title:
          "How AI-Solution Helped a Retail Company Boost Sales with AI-Powered Personalization",
        description:
          "A real-world example of how AI improved sales and customer experience.",
        image: "/sample.jpg",
      },
      {
        title: "Enhancing Cybersecurity with AI: A Case Study in Finance",
        description:
          "Learn how AI helps detect and prevent cyber threats in finance.",
        image: "/sample.jpg",
      },
      {
        title: "Automating HR Processes with AI: A Success Story",
        description:
          "See how AI streamlined HR operations and improved hiring efficiency.",
        image: "/sample.jpg",
      },
    ],
  },
  {
    category: "AI Industry Trends & Insight",
    blogs: [
      {
        title:
          "Introducing Our AI-Powered Virtual Assistant: Features & Benefits",
        description:
          "A deep dive into the features of our latest AI-powered virtual assistant.",
        image: "/sample.jpg",
      },
      {
        title:
          "How We Use AI to Improve Business Intelligence & Predictive Analytics",
        description: "Understand how AI enhances data-driven decision-making.",
        image: "/sample.jpg",
      },
      {
        title:
          "Behind the Scenes: How AI-Solution Develops AI-Based Prototypes Faster",
        description:
          "An inside look at our AI-based product development process.",
        image: "/sample.jpg",
      },
    ],
  },
];

export default function Blog() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Articles & Blogs
      </h2>

      {blogCategories.map((category, index) => (
        <div key={index} className="mb-12">
          {/* Category Title */}
          <h3 className="text-xl font-semibold mb-6">{category.category}</h3>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.blogs.map((blog, idx) => {
              const slug = generateSlug(blog.title); // Convert title to slug
              return (
                <div
                  key={idx}
                  className="border rounded-lg p-4 shadow-md text-center"
                >
                  <div className="w-full h-40 flex items-center justify-center mb-4">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h4 className="text-lg font-semibold">{blog.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {blog.description}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => router.push(`/blog/${slug}`)}
                  >
                    Read
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
