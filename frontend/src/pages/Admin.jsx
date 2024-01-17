import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminContext from "../context/AdminContext";
import "./Admin.css";

export default function Admin() {
  const { setUserToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userToken");
    setUserToken(null);
    navigate("/");
  };

  return (
    <div className="admin-page">
      <h1>Bienvenue</h1>
      <h3>Que souhaitez-vous faire ? </h3>
      <div className="btn-col">
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/sites")}
        >
          Gérer les sites
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/activities")}
        >
          Gérer les activités
        </button>
        <button type="button" className="back" onClick={handleLogout}>
          Déconnexion
        </button>
        <button type="button" className="portal" onClick={() => navigate("/")}>
          Accueil
        </button>
      </div>
    </div>
  );
}
