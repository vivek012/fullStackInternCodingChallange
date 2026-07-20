import { useEffect, useState } from "react";
import api from "../services/api";
import ChangePassword from "../component/ChangePassword";

interface RatedUser {
  id: number;
  rating: number;
  User: {
    name: string;
    email: string;
  };
}

interface DashboardData {
  averageRating: number;
  users: RatedUser[];
}

const OwnerDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    averageRating: 0,
    users: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/owner/dashboard");
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Store Owner Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold">
          Average Rating
        </h2>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {dashboard.averageRating}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Users Who Rated Your Store
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">
                Name
              </th>
              <th className="border p-3 text-left">
                Email
              </th>
              <th className="border p-3 text-left">
                Rating
              </th>
            </tr>
          </thead>

          <tbody>
            {dashboard.users.map((item) => (
              <tr key={item.id}>
                <td className="border p-3">
                  {item.User.name}
                </td>

                <td className="border p-3">
                  {item.User.email}
                </td>

                <td className="border p-3">
                  {item.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ChangePassword endpoint="/owner/change-password" />
      </div>
      
    </div>
  );
};

export default OwnerDashboard;