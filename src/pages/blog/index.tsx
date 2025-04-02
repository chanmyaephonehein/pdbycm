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
        image: "/image8.jpeg",
      },
      {
        title: "Top 5 AI Trends in 2025",
        description:
          "Discover the top AI trends that will dominate in the coming years.",
        image: "/image9.png",
      },
      {
        title: "The Role of AI in Digital Employee Experience",
        description: "How AI enhances employee engagement and productivity.",
        image: "/image10.png",
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
        image: "/image11.jpg",
      },
      {
        title: "Enhancing Cybersecurity with AI: A Case Study in Finance",
        description:
          "Learn how AI helps detect and prevent cyber threats in finance.",
        image: "/image12.jpg",
      },
      {
        title: "Automating HR Processes with AI: A Success Story",
        description:
          "See how AI streamlined HR operations and improved hiring efficiency.",
        image: "/image13.webp",
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
          <h3 className="text-xl font-semibold mb-6">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.blogs.map((blog, idx) => {
              const slug = generateSlug(blog.title);
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

      {/* Gallery Section */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold text-center mb-6">
          AI in Action: Gallery
        </h3>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          Explore real-world AI implementation through visuals from our
          projects, events, and partner stories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "/image1.jpg",
            "/image2.jpg",
            "/image3.png",
            "/image4.jpg",
            "/image5.png",
            "/image6.jpg",
            "/image7.jpeg",
            "/image8.jpeg",
          ].map((src, idx) => (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="block"
            >
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Us CTA Section */}
      <div className="text-center mt-24">
        <h3 className="text-2xl font-semibold mb-2">
          Want to explore more or collaborate with us?
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-4">
          Whether you're looking for expert insight or want to showcase your AI
          success story, we’d love to hear from you.
        </p>
        <Button onClick={() => router.push("/contactus")}>Contact Us</Button>
      </div>
    </div>
  );
}
