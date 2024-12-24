import React from "react";
import Header from "./Header";

export default function Profile() {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    currentTasks: 15,
  };

  return (
    <>
      <Header buttonName={"Dashboard"} buttonLink={"/dashboard"} />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            {/* Placeholder for the profile picture */}
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <h2 className="profile-name">John Doe</h2>

          <div className="profile-details">
            <p>
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="highlight">{userData.email}</span>
            </p>
            <p>
              <strong>Current Tasks:</strong> {userData.currentTasks} Tasks
            </p>
          </div>

          <button className="profile-button">Change Password</button>
        </div>
      </div>
    </>
  );
}

// return (
//   <>
//     <Header buttonName={"Dashboard"} buttonLink={"/dashboard"} />
//   </>
// );
