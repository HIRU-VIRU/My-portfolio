import { config } from "../config";
import Magnetic from "./effects/Magnetic";
import { TransitionLink } from "../context/PageTransition";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Magnetic>
          <TransitionLink to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
            Play With Me →
          </TransitionLink>
        </Magnetic>

        <Magnetic>
          <a
            href={config.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn-hire"
            data-cursor="disable"
          >
            Hire Me →
          </a>
        </Magnetic>
      </div>
    </div>
  );
};

export default CallToAction;
