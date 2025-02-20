import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// Blog Detail Page Static Content
const blogPost = {
  title: "How AI is Transforming the Future of Work",
  description:
    "Explore how AI is reshaping the workplace and improving efficiency. AI is revolutionizing industries, automating tasks, and enhancing decision-making through predictive analytics.",
  image: "/sample.jpg",
  content: `
    The rise of Artificial Intelligence (AI) has brought a seismic shift to the modern workplace. 
    AI-powered automation is not just about replacing human jobs; it’s about creating efficiency, 
    eliminating repetitive tasks, and allowing employees to focus on more strategic initiatives.

    ### How AI is Changing Industries
    - **Automation in HR & Recruitment**: AI-driven recruitment tools can analyze thousands of applications in seconds.
    - **Customer Service Transformation**: AI chatbots provide 24/7 support, reducing response times significantly.
    - **Predictive Analytics**: AI helps businesses make data-driven decisions based on real-time insights.

    ### The Future of AI in the Workplace
    AI is continuously evolving, and in the next decade, we will see even deeper integration into workflows, 
    optimizing productivity and reshaping how businesses operate. 

    **Are you ready for the AI revolution? Start adopting AI-driven solutions today!**
  `,
};

// Generate Dynamic Metadata for SEO
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
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="outline" className="mb-6">
          ← Back to Blog
        </Button>
      </Link>

      {/* Blog Header */}
      <Card>
        <CardHeader>
          <CardTitle>{blogPost.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            width={800}
            height={400}
            className="rounded-lg w-full object-cover mb-4"
          />
          <p className="text-gray-600">{blogPost.description}</p>
          <Separator className="my-4" />
          <div className="prose max-w-none text-gray-800">
            {blogPost.content}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold mb-2">Enjoyed this article?</h3>
        <p className="text-gray-600">
          Check out more AI insights and success stories.
        </p>
        <Button className="mt-4" onClick={() => window.scrollTo(0, 0)}>
          Back to Top
        </Button>
      </div>
    </div>
  );
}
