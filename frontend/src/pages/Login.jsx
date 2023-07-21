import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const user = {
        name,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        user
      );

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      setErrorMessage("Mauvais identifiant ou mot de passe");
      console.error(error.message);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };
  return (
    <div className="login">
      <h1>Bienvenue</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre nom d'utilisateur"
          className="inputs"
          onChange={handleNameChange}
          required
        />
        <input
          type="password"
          placeholder="Votre mot de passe"
          className="inputs"
          onChange={handlePasswordChange}
          required
        />
        <div className="submit">
          <button type="submit" className="submit-button">
            Connexion
          </button>
          <button type="button" className="back" onClick={() => navigate("/")}>
            Retour
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
