import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import Trash from "../assets/delete.png";
import "./DeleteSite.css";

export default function DeleteSite() {
  const [sites, setSites] = useState([]);
  const { userToken } = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/sites/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Site supprimé");
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
          .then((result) => {
            setSites(result.data);
          })
          .catch((error) => console.error("Error fetching options:", error));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="delete-page">
      <h1>Supprimer un site</h1>
      <div className="element-col">
        {sites.map((el) => (
          <div className="element">
            <p key={el.id}>{el.name}</p>
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
