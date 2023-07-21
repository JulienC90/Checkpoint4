import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modif from "../assets/pencil.svg";
import "./ModifySite.css";

export default function ModifySite() {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  });

  return (
    <div className="modify-page">
      <h1>Modifier un site</h1>
      <div className="form-col">
        {sites.map((site) => (
          <div className="row-element">
            <p key={site.id}>{site.name}</p>
            <div>
              <Link to={`/sites/modify/${site.id}`}>
                <img src={Modif} alt="Modif" className="small-icon" />
              </Link>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="back"
          onClick={() => navigate("/admin")}
        >
          Retour
        </button>
      </div>
    </div>
  );
}
