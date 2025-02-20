import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold">AI Solution</h1>
          <h2 className="text-xl font-semibold mt-2">The Best Solution</h2>
          <p className="mt-4 text-gray-600">
            Lorem Ipsum is simply dummy te xt of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s.
          </p>
          <Button className="mt-6">Contact Us</Button>
        </div>
        <div className="mt-6 lg:mt-0">
          <div className="w-64 h-40 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold">Mission Statement</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          AI-Solution is dedicated to revolutionizing the digital employee
          experience by leveraging AI-powered software solutions. Our mission is
          to empower businesses across industries with intelligent automation,
          predictive insights, and innovative AI-driven tools.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold">
          Empowering Businesses with AI: Smarter Decisions, Faster Operations,
          Enhanced Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* AI Assistants */}
          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Icon</span>
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Assistants</h4>
              <p className="text-gray-600 mt-2">
                Automate customer support & employee workflows.
              </p>
            </CardContent>
          </Card>

          {/* AI Automation */}
          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Icon</span>
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Automation</h4>
              <p className="text-gray-600 mt-2">
                Streamline operations, reduce costs, and improve productivity.
              </p>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Icon</span>
            </div>
            <CardContent className="mt-4 text-center">
              <h4 className="text-lg font-semibold">AI Insights</h4>
              <p className="text-gray-600 mt-2">
                Data-driven decision-making with predictive analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
