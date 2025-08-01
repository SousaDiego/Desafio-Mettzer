import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-black hover:bg-black text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}