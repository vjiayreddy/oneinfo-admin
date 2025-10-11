interface Creator {
  id: number;
  name: string;
  email: string;
  category: string;
  followers: string;
  engagement: string;
  status: string;
  joinedDate: string;
}

interface CreatorsListProps {
  creators: Creator[];
}

export default function CreatorsList({ creators }: CreatorsListProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Creator
              </th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Followers
              </th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {creators.map((creator) => (
              <tr
                key={creator.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-medium">
                      {creator.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {creator.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {creator.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-5 whitespace-nowrap">
                  <span className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                    {creator.category}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {creator.followers}
                </td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {creator.engagement}
                </td>
                <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      creator.status === "Active"
                        ? "text-green-700 bg-green-100"
                        : "text-yellow-700 bg-yellow-100"
                    }`}
                  >
                    {creator.status}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                  {creator.joinedDate}
                </td>
                <td className="px-4 sm:px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg
                      className="w-5 h-5 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
        <div className="text-sm text-gray-700 hidden sm:block">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{creators.length}</span> of{" "}
          <span className="font-medium">50</span> results
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg">
            1
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}