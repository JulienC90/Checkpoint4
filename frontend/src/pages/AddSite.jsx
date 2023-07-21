import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminContext from "../context/AdminContext";
import "./AddSite.css";

export default function AddSite() {
  const { userToken } = useContext(AdminContext);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [maplink, setMaplink] = useState("");
  const navigate = useNavigate();
  const handleSubmitAddSite = (e) => {
    e.preventDefault();
    const site = {
      name,
      year,
      address,
      maplink,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/sites`, site, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Site ajouté");
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  };
  return (
    <div className="add-site">
      <h1>Ajouter un site</h1>
      <form className="form" onSubmit={(event) => handleSubmitAddSite(event)}>
        <div className="row">
          <label aria-controls="label" htmlFor="name">
            Nom du site:
          </label>
          <input
            className="input"
            id="name"
            type="text"
            placeholder="ex. Saint-Eloi"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="year">Année de construction:</label>
          <input
            className="input"
            id="year"
            type="text"
            placeholder="ex. 2000"
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="address">Adresse complète:</label>
          <input
            className="input"
            id="text"
            type="address"
            placeholder="ex. 1 rue du site"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="maplink">Lien Google Maps</label>
          <input
            className="input"
            id="maplink"
            type="link"
            placeholder="ex. https://www.google.com/maps/..."
            onChange={(e) => setMaplink(e.target.value)}
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
