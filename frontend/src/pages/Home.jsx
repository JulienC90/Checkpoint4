import Dropdown from "../components/Dropdown";
import "./Home.css";

export default function Home() {
  return (
    <div className="welcome">
      <h1>Bienvenue</h1>
      <div className="full-text">
        <p className="text">
          En tant que nouvel arrivant dans le domaine de l'aéronautique
          Toulousain, vous serez amené, tout au long de votre carrière, à
          travailler sur divers sites et dans divers secteurs.
        </p>
        <p className="text">
          Ce site à pour fonction de vous aidez en recensant autour et dans la
          ville de Toulouse, les sites du géant Aéronautique et fleuron de
          l'Industrie Française.
        </p>
      </div>
      <div className="search">
        <h2>Recherchez un site:</h2>
        <Dropdown />
      </div>
    </div>
  );
}
