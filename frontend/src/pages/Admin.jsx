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
      <p>Que souhaitez-vous faire ? </p>
      <div className="btn-col">
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/sites/add")}
        >
          Ajouter un site
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/sites/modify")}
        >
          Modifier un site
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/sites/delete")}
        >
          Supprimer un site
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
