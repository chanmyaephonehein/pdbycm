import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-100 h-screen p-4">
      <div className="text-xl font-bold mb-6">AI-Solution</div>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="p-2 rounded-md hover:bg-gray-200">
          Dashboard
        </Link>
        <Link href="/inquiries" className="p-2 rounded-md hover:bg-gray-200">
          Inquiries
        </Link>
        <Link href="/users" className="p-2 rounded-md hover:bg-gray-200">
          Users Management
        </Link>
        <Link
          href="/blog-creation"
          className="p-2 rounded-md hover:bg-gray-200"
        >
          Blog Creation
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
