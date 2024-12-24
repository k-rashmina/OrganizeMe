import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: undefined,
  });

  const navigate = useNavigate();

  //function to validate email
  const validateEmail = (e) => {
    let errorMsg = undefined;
    const emailPattern = /^[^\s@A-Z]+@[^\s@A-Z]+\.[^\s@A-Z]+$/;

    if (!e.target.value) {
      //check if there is no email address
      errorMsg = "No email, no access -.-";
    } else if (!emailPattern.test(e.target.value)) {
      //check if the email address is invalid
      errorMsg = "Your email address is fake :(";
    }
    setErrors((prevState) => {
      return {
        ...prevState,
        emailError: errorMsg,
      };
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!errors.emailError) {
      setSubmitStatus(true);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      axios
        .post("http://localhost:5000/api/user/login", {
          userEmail: formData.email,
          userPassword: formData.password,
        })
        .then((res) => {
          // console.log("accessToken", res.data.accessToken);
          if (res.data.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .finally(() => setSubmitStatus(false));
    }
  }, [submitStatus]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>
        <p>
          Welcome back! Sign in and let's make some productivity magic happen!
        </p>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          required={true}
          onChange={handleChange}
          onBlur={validateEmail}
        />
        {errors.emailError && (
          <p className="form-error-msg">{errors.emailError}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required={true}
          onChange={handleChange}
        />
        <div className="login-options-div">
          <p>
            Having trouble signing in?{" "}
            <span>
              <Link className="signup-link" to={"/forgotPassword"}>
                Forgot Password
              </Link>
            </span>
          </p>
          <p>
            Don't have an account?{" "}
            <span>
              <Link className="signup-link" to={"/register"}>
                Signup
              </Link>
            </span>
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
