import "./Intro.css";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/Icon.png";
import icon2 from "../../assets/Icon2.png";
import icon3 from "../../assets/Icon3.png";


export default function Intro() {
  const goTo = useNavigate();
  
  return (
    <div className="intro">
      <h1 className="intro__title">
        Welcome to Mesh AI
      </h1>

      <div className="intro__cards">
        <div className="intro__card">
           <img src={icon} alt="Documents vector" className="intro__card-icon" />
          <p className="intro__card-text">
            Keep your notes sorted and searchable
          </p>
        </div>

        <div className="intro__card">
           <img src={icon2} alt="Documents vector" className="intro__card-icon" />
          <p className="intro__card-text">
            Keep all your notes together
          </p>
        </div>

        <div className="intro__card">
          <img src={icon3} alt="Documents vector" className="intro__card-icon" />
            <p className="intro__card-text">
              Share your notes with others
            </p>
        </div>

      </div>
      <button onClick={() => goTo("/knowledge")}>Start</button>
    </div>
  );
}
