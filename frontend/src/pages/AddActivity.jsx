import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminContext from "../context/AdminContext";
import "./AddActivity.css";

export default function AddActivity() {
  const { userToken } = useContext(AdminContext);
  const [sites, setSites] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/activities`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const navigate = useNavigate();
  const handleSubmitAddSite = (e) => {
    e.preventDefault();
    const job = {
      site_id: selectedSite.id,
      activity_id: selectedActivity.id,
    };
    if (!job) {
      // eslint-disable-next-line no-alert
      alert("Veuillez choisir un site et une activité");
    } else {
      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/sites/${selectedSite}/activities`,
          job,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(() => {
          // eslint-disable-next-line no-alert
          alert("Activité ajoutée au site");
          navigate("/admin/activities");
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    }
  };

  return (
    <div className="add-activity">
      <h1>Ajouter une activité</h1>
      <form className="form" onSubmit={(event) => handleSubmitAddSite(event)}>
        <div className="row">
          <label aria-controls="label" htmlFor="site">
            Site:
          </label>
          <select
            id="site"
            className="select"
            onChange={(e) =>
              setSelectedSite(
                sites.find((site) => site.id === parseInt(e.target.value, 10))
              )
            }
          >
            <option value="aucun">Aucun</option>
            {sites.map((sit) => (
              <option key={sit.id} value={sit.id}>
                {sit.name}
              </option>
            ))}
          </select>

          <label aria-controls="label" htmlFor="name">
            Nom de l'activité:
          </label>
          <select
            id="name"
            className="select"
            onChange={(e) =>
              setSelectedActivity(
                activities.find(
                  (act) => act.id === parseInt(e.target.value, 10)
                )
              )
            }
          >
            <option value="aucune">Aucune</option>
            {activities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.activity}
              </option>
            ))}
          </select>
          <div className="data">
            <div className="line">
              <p>
                <u>Site selectionné:</u>
              </p>
              <div className="data-column">
                {selectedSite ? (
                  <p className="highlighted">{selectedSite.name}</p>
                ) : (
                  <p className="invalid">-</p>
                )}
              </div>
            </div>
            <div className="line">
              <p>
                <u>Activité à ajouter:</u>
              </p>
              <div className="data-column">
                {selectedActivity ? (
                  <p className="highlighted">{selectedActivity.activity}</p>
                ) : (
                  <p className="invalid">-</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="submit">
          {!selectedSite || !selectedActivity ? (
            <div className="submit-error">
              <p className="error">Veuillez choisir un site et une activité</p>
              <button type="button" className="inactive-button">
                Valider
              </button>
            </div>
          ) : (
            <button type="submit" className="submit-button">
              Valider
            </button>
          )}
          <button type="button" className="back" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
