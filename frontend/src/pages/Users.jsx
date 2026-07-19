import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await api.get(
      `/admin/users?search=${search}`
    );

    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded w-full"
        />

        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-5 rounded"
        >
          Search
        </button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t text-center"
              >
                <td className="p-3">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}