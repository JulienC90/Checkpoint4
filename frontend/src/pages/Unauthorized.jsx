import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="unauthorized-page">
      <h2 className="unauthorized">Accès refusé</h2>
      <p>Vous n'êtes pas autorisé à consulter cette page.</p>
      <button type="button" className="back" onClick={() => navigate("/")}>
        Retour
      </button>
    </div>
  );
}
