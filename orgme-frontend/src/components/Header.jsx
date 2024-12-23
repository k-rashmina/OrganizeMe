import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function Header() {
  const navigate = useNavigate();

  const logoutUser = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  return (
    <div className="header-div">
      <div className="logo-div">
        <img src={logo} alt="" />
      </div>
      <div className="header-nav-div">
        <button
          className="filter-form-button"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

        <button className="filter-form-button" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
}
