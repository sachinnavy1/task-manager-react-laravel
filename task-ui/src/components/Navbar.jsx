import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Task Manager
      </h3>

      <div>
        <button onClick={() => navigate("/tasks")} className="nav-btn">
          Tasks
        </button>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
