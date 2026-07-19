import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          Store Rating App ⭐
        </Link>

        <div className="flex gap-5 items-center">
          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin">
                Dashboard
              </Link>

              <Link to="/admin/users">
                Users
              </Link>

              <Link to="/admin/stores">
                Stores
              </Link>
            </>
          )}

          {user?.role === "USER" && (
            <Link to="/stores">
              Stores
            </Link>
          )}

          {user?.role === "OWNER" && (
            <Link to="/owner">
              Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}