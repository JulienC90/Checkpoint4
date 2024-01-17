import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import Trash from "../assets/delete.png";
import "./DeleteActivity.css";

export default function DeleteActivity() {
  const [activities, setActivities] = useState([]);
  const { userToken } = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/activities`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/activities/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Site supprimé");
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/activities`)
          .then((result) => {
            setActivities(result.data);
          })
          .catch((error) => console.error("Error fetching options:", error));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="delete-page">
      <h1>Supprimer une activité</h1>
      <div className="element-col">
        {activities.map((el) => (
          <div className="element">
            <p key={el.id}>{el.activity}</p>
            <button
              type="button"
              onClick={() => handleRemove(el.id)}
              className="minus"
            >
              <img src={Trash} alt="Supprimer" className="small-icon" />
            </button>
          </div>
        ))}
        <button type="button" className="back" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    </div>
  );
}
