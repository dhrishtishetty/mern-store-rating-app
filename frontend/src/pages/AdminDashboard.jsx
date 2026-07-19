import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          title="Total Users"
          value={stats.totalUsers}
        />

        <Card
          title="Total Stores"
          value={stats.totalStores}
        />

        <Card
          title="Total Ratings"
          value={stats.totalRatings}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          to="/admin/users"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/stores"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Manage Stores
        </Link>

        <Link
          to="/admin/create-user"
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          Create User
        </Link>

        <Link
          to="/admin/create-store"
          className="bg-orange-500 text-white px-6 py-3 rounded"
        >
          Create Store
        </Link>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-gray-500">{title}</h2>

      <p className="text-4xl font-bold mt-3">{value}</p>
    </div>
  );
}