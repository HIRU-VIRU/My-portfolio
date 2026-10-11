import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";
import AgentAvatar from "./AgentAvatar/AgentAvatar";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <span className="landing-shock" aria-hidden="true" />
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI</div>
            </h2>
            <h2 style={{ marginTop: '20px' }}>
              <div className="landing-h2-info">Engineer</div>
            </h2>
          </div>
          <AgentAvatar />
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
