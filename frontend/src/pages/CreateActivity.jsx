import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminContext from "../context/AdminContext";
import "./AddActivity.css";

export default function AddActivity() {
  const { userToken } = useContext(AdminContext);
  const [activity, setActivity] = useState("");

  const navigate = useNavigate();
  const handleSubmitAddSite = (e) => {
    e.preventDefault();
    const job = {
      job: activity,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/activities`, job, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Activité ajoutée");
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  };
  return (
    <div className="add-activity">
      <h1>Ajouter une activité</h1>
      <form className="form" onSubmit={(event) => handleSubmitAddSite(event)}>
        <div className="row">
          <label aria-controls="label" htmlFor="name">
            Nom de l'activité:
          </label>
          <input
            className="input"
            id="name"
            type="text"
            placeholder="ex. Peinture"
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </div>
        <div className="submit">
          <button type="submit" className="submit-button">
            Valider
          </button>
          <button type="button" className="back" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
