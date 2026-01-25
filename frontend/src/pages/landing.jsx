import { Link } from "react-router-dom";
import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  let navigate = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h3>Shakir Video Call</h3>
        </div>
        <div className="navlist">
          <p
            onClick={() => {
              navigate("/home");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Register
          </p>
          <div role="button">
            <p
              onClick={() => {
                navigate("/auth");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> With Your Loved
            Ones
          </h1>
          <p>Cover a distance by Shakir Video Call</p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div className="bg-img">
          <img src="/mobile.png" alt="Image" />
        </div>
      </div>
    </div>
  );
}
