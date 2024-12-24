import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

export default function Profile() {
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState({});

  const [passwordData, setPasswordData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    oldPass: undefined,
    newPass: undefined,
    confirmPass: undefined,
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  //function to show update form modal
  const showModal = () => {
    setModalStyle({
      display: "block",
    });
  };

  //function to close update form modal
  const closeModal = () => {
    setModalStyle({
      display: "none",
    });
  };

  //function to validate password
  const validatePassword = (e) => {
    const password = e.target.value;
    let errorMsg = undefined;
    const passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      errorMsg = "Hey!, you don't want to secure your account? :|";
    } else if (password.length < 8) {
      errorMsg = "8 or more characters, no exceptions! >(";
    } else if (!passPattern.test(password)) {
      errorMsg =
        "Spice up your password, add at least one letter and one number";
    }
    setErrors((prevState) => {
      return {
        ...prevState,
        newPass: errorMsg,
      };
    });
  };

  //function to validate confirm password
  const validateConfirmPass = (e) => {
    const password = passwordData.newPass;
    const confirmPass = e.target.value;
    let errorMsg = undefined;

    if (password !== confirmPass) {
      errorMsg = "Come on this is copy writing, passwords don't match!";
    }

    setErrors((prevState) => {
      return {
        ...prevState,
        confirmPass: errorMsg,
      };
    });
  };

  const [modalStyle, setModalStyle] = useState({
    display: "none",
  });

  const changePassword = (e) => {
    e.preventDefault();
    if (!errors.oldPass && !errors.newPass && !errors.confirmPass) {
      axios
        .put("http://localhost:5000/api/user/changePassword", passwordData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert(res.data.message);
          closeModal();
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

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
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="highlight">{user.email}</span>
            </p>
            <p>
              <strong>Current Tasks:</strong> {4} Tasks
            </p>
          </div>

          <button className="profile-button" onClick={showModal}>
            Change Password
          </button>
        </div>
      </div>

      {/* Change Password Form Modal */}
      <div className="modal" style={modalStyle}>
        <center>
          <form className="login-form update-form" onSubmit={changePassword}>
            <h2>Change Password</h2>
            <input
              type="password"
              name="oldPass"
              placeholder="Enter your old password"
              value={passwordData?.oldPass}
              required={true}
              onChange={handleChange}
            />

            <input
              type="password"
              name="newPass"
              placeholder="Enter a New Password"
              value={passwordData?.newPass}
              onChange={handleChange}
              onBlur={validatePassword}
            />
            {errors.newPass && (
              <p className="form-error-msg">{errors.newPass}</p>
            )}
            <input
              type="password"
              name="confirmPass"
              placeholder="Confirm Password"
              value={passwordData?.confirmPass}
              required={true}
              onChange={handleChange}
              onBlur={validateConfirmPass}
            />

            {errors.confirmPass && (
              <p className="form-error-msg">{errors.confirmPass}</p>
            )}
            <div className="update-form-buttons">
              <button>Change Password</button>
              <button type="button" onClick={() => closeModal()}>
                Cancel
              </button>
            </div>
          </form>
        </center>
      </div>
    </>
  );
}

// return (
//   <>
//     <Header buttonName={"Dashboard"} buttonLink={"/dashboard"} />
//   </>
// );
