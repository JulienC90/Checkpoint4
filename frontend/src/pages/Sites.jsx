import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Sites.css";

export default function Sites() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites/${id}`)
      .then((response) => setSiteData(response.data))
      .catch((error) => console.error("Error fetching option data:", error));
  }, []);

  if (!siteData) {
    return <div className="loading">Chargement ...</div>;
  }

  return (
    <div className="site-data">
      <h2>{siteData.name}</h2>
      <div className="full-data">
        <div className="data-row">
          <p>
            <u>Nom du site:</u>
          </p>
          <p>{siteData.name}</p>
        </div>
        <div className="data-row">
          <p>
            <u>Année de construction:</u>
          </p>
          <p>{siteData.year}</p>
        </div>
        <div className="data-row">
          <p>
            <u>Adresse:</u>
          </p>
          <p id="address">{siteData.address}</p>
        </div>
      </div>
      {siteData.maplink !== "" ? (
        <Link to={siteData.maplink} className="maplink">
          Voir sur Google Maps
        </Link>
      ) : (
        <p className="maplink">Pas encore de lien google maps</p>
      )}
      <div className="return">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="return-button"
        >
          Retour
        </button>
      </div>
    </div>
  );
}
