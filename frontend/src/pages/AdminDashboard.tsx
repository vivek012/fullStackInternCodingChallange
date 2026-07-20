import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../component/AdminSidebar";
import DashboardCard from "../component/DashboardCard";
import AddUserForm from "../component/AddUserForm";
import UsersTable from "../component/UsersTable";
import AddStoreForm from "../component/AddStoreForm";
import StoresTable from "../component/StoresTable";
import ChangePassword from "../component/ChangePassword";

interface Dashboard {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

const AdminDashboard = () => {
  const [dashboard, setDashboard] =
    useState<Dashboard>({
      totalUsers: 0,
      totalStores: 0,
      totalRatings: 0,
    });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get(
          "/admin/dashboard"
        );

        setDashboard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Users"
            value={dashboard.totalUsers}
          />

          <DashboardCard
            title="Total Stores"
            value={dashboard.totalStores}
          />

          <DashboardCard
            title="Total Ratings"
            value={dashboard.totalRatings}
          />

        </div>
        <div className="mt-8">
          <AddUserForm />
        </div>

        <div className="mt-8">
          <AddStoreForm />
        </div>

        <div className="mt-8">
          <UsersTable />
        </div>

        <div className="mt-8">
          <StoresTable />
        </div>
        <div className="mt-8">
          <ChangePassword endpoint="/admin/change-password" />
        </div>
      </main>

      
    </div>
  );
};

export default AdminDashboard;