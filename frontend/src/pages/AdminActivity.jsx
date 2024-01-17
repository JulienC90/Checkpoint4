import { useNavigate } from "react-router-dom";
import "./AdminActivity.css";

export default function AdminActivity() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Gestion des Activités</h1>
      <h3>Que souhaitez-vous faire ? </h3>
      <div className="btn-col">
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/activities/create")}
        >
          Créer une activité
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/activities/add")}
        >
          Ajouter une activité
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate("/admin/activities/delete")}
        >
          Supprimer une activité
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
