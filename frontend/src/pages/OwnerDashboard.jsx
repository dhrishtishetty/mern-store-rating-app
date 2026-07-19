import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/owner/dashboard");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-base-content">
        Store Owner Dashboard
      </h1>

      <div className="bg-base-100 shadow-lg rounded-xl p-6 mb-8 text-base-content">
        <h2 className="text-2xl font-bold">
          {data.store.name}
        </h2>

        <p className="mt-2">
          Email: {data.store.email}
        </p>

        <p>
          Address: {data.store.address}
        </p>

        <div className="mt-5 bg-yellow-100 p-4 rounded-lg">
          <p className="text-xl font-semibold">
            Average Rating ⭐ {data.store.averageRating}
          </p>
        </div>
      </div>

      <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden text-base-content">
        <h2 className="text-xl font-bold p-5">
          Users Who Rated Your Store
        </h2>

        <table className="w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {data.ratings.map((item) => (
              <tr
                key={item.userId}
                className="border-t text-center"
              >
                <td className="p-3">{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>⭐ {item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}