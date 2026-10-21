import "./Intro.css";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const goTo = useNavigate();
  return (
    <div className="intro">
      <h1>Welcome to Mesh AI</h1>
      <div className="cards">
        <div className="card">
          <h2>Organize</h2>
          <p>Keep your notes sorted and searchable.</p>
        </div>
        <div className="card">
          <h2>Sync</h2>
          <p>Keep all your notes together</p>
        </div>
        <div className="card">
          <h2>Share</h2>
          <p>Share your notes with others</p>
        </div>
      </div>
      <button onClick={() => goTo("/knowledge")}>Start</button>
    </div>
  );
}
