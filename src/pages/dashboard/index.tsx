const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Total Inquiries</h2>
          <p className="text-2xl">65</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">3</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Total Blogs</h2>
          <p className="text-2xl">6</p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold">Inquiries by Date</h2>
        <div className="h-48 flex items-center justify-center border border-dashed">
          Chart
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
