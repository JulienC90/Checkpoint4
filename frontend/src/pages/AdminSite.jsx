import { useNavigate } from "react-router-dom";
import "./AdminSite.css";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Gestion des Sites</h1>
      <h3>Que souhaitez-vous faire ? </h3>
      <div className="btn-col">
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/sites/add")}
        >
          Ajouter un site
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/sites/modify")}
        >
          Modifier un site
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/sites/delete")}
        >
          Supprimer un site
        </button>
        <button
          type="button"
          className="back"
          onClick={() => navigate("/admin")}
        >
          Retour
        </button>
        <button type="button" className="portal" onClick={() => navigate("/")}>
          Accueil
        </button>
      </div>
    </div>
  );
}
