import "./Intro.css";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/Icon.png";
import icon2 from "../../assets/Icon2.png";
import icon3 from "../../assets/Icon3.png";
import logo from "../../assets/logo.png";


export default function Intro() {
  const goTo = useNavigate();
  
  return (
    <div className="intro">
      <h1 className="intro__title">
        Welcome to Mesh AI
        <img className="intro__title-decoration" src={logo} alt="" ></img>
      </h1>

      <div className="intro__cards">
        <div className="intro__card">
           <img src={icon} alt="Documents vector" className="intro__card-icon" />
          <p className="intro__card-text">
            Bring all your documents into one secure AI workspace
          </p>
        </div>

        <div className="intro__card">
           <img src={icon2} alt="Documents vector" className="intro__card-icon" />
          <p className="intro__card-text">
            Organize and manage the documents that power your AI
          </p>
        </div>

        <div className="intro__card">
          <img src={icon3} alt="Documents vector" className="intro__card-icon" />
            <p className="intro__card-text">
              Your knowledge base, accessible through a simple chat interface            
            </p>
        </div>
      </div>

      <div className="intro__action-container">
        <p className="intro__prompt">
          Start by creating your Organization’s Knowledge Base
        </p>

      <button onClick={() => goTo("/knowledge")}>Start</button>
    </div>
    </div>
  );
}
