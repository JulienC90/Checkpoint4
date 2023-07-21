import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import NoAdmin from "../assets/user.png";
import Admin from "../assets/user-connected.png";
import "./NavBar.css";

export default function NavBar() {
  const { userToken } = useContext(AdminContext);
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="title">
          <h2>ATLANTIC</h2>
          <h2>AERO SITES</h2>
        </div>
        {userToken ? (
          <Link to="/admin">
            <img className="icon" src={Admin} alt="Connecté" />
          </Link>
        ) : (
          <Link to="/login">
            <img className="icon" src={NoAdmin} alt="Déconnecté" />
          </Link>
        )}
      </div>
    </div>
  );
}
