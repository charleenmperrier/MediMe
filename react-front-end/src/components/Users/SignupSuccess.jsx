// Libraries
import { Link } from "react-router-dom";

// Components
import TextButton from "../TextButton";

//Icons
import hiIcon from "../../images/hi.png";

// Stylesheet
import "./SignupSuccess.scss";

export default function SignupSuccess() {
  return (
    <section className="signup-success">
      <h1 className="signup-success--title">Welcome to MediMe!</h1>
      <div className="signup-success--icon">
        <img src={hiIcon} component="img" alt="welcome icon" />
      </div>
      <h3 className="signup-success--heading">Let's get you started!</h3>
      <div className="signup-success--user-action">
        <Link to="/edit">
          <TextButton userAction color="secondary">
            Enter Medi-Info
          </TextButton>
        </Link>
        <Link to="/" className="link-text">
          Skip for now
        </Link>
      </div>
    </section>
  );
}
