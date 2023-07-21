import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminContext from "../context/AdminContext";
import "./ModifySiteId.css";

export default function ModifySiteId() {
  const { userToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const { siteId } = useParams();
  const [site, setSite] = useState({});
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [maplink, setMaplink] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites/${siteId}`)
      .then((response) => {
        setSite(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, [siteId]);

  const handleSubmitModifySite = (event) => {
    event.preventDefault();
    const newsite = {
      name,
      year,
      address,
      maplink,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/sites/${siteId}`, newsite, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Site modifié");
        navigate("/sites/modify");
      })
      .catch((error) => {
        console.error("Error modifying site:", error);
      });
  };

  return (
    <div className="modify-site-page">
      <h1>Modifier un site</h1>
      <form
        className="form"
        onSubmit={(event) => handleSubmitModifySite(event)}
      >
        <div className="row">
          <label aria-controls="label" htmlFor="name">
            Nom du site:
          </label>
          <input
            className="input"
            id="name"
            type="text"
            placeholder={site.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="year">Année de construction:</label>
          <input
            className="input"
            id="year"
            type="text"
            placeholder={site.year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="address">Adresse complète:</label>
          <input
            className="input"
            id="text"
            type="address"
            placeholder={site.address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="maplink">Lien Google Maps</label>
          <input
            className="input"
            id="maplink"
            type="link"
            placeholder={site.maplink}
            onChange={(e) => setMaplink(e.target.value)}
          />
        </div>
        <div className="submit">
          <button type="submit" className="submit-button">
            Valider
          </button>
          <button
            type="button"
            className="back"
            onClick={() => navigate("/sites/modify")}
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
