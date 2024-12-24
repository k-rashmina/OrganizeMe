import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg">
      <div className="page-title">OrganizeMe</div>
      <p className="slogan">Streamline Your Tasks, Simplify Your Life.</p>
      <button className="start-button" onClick={() => navigate("/login")}>
        Get Started {">>"}
      </button>
    </div>
  );
}
