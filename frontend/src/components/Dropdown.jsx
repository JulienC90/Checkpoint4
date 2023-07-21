import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dropdown.css";

export default function Dropdown() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    navigate(`/sites/${selectedOption}`);
  };

  return (
    <select
      onChange={handleOptionChange}
      defaultValue="Aucun"
      className="select"
    >
      <option value="Aucun" disabled>
        Aucun
      </option>
      {sites.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
