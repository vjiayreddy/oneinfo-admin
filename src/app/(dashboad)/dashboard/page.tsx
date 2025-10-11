import DashboardStats from "@/components/dashboard/stats";

const HomePage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Welcome back! Here's what's happening with your creators today.</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Additional dashboard content can go here */}
    </div>
  );
};

export default HomePage;