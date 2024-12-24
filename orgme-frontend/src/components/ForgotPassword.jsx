import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
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
      errorMsg = "No email, no link -.-";
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
        .post("http://localhost:5000/api/user/forgotPassword", {
          email: formData.email,
        })
        .then((res) => {
          alert(
            "An email with instructions will be sent to the given email address."
          );
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .finally(() => setSubmitStatus(false));
    }
  }, [submitStatus]);

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>
          Enter the email address of the account
          <br />
          to get a reset link.
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

        <div className="signup-options-div">
          <p>
            Remembered your password?{" "}
            <span>
              <Link className="login-link" to={"/login"}>
                Login
              </Link>
            </span>
          </p>
        </div>

        <button type="submit">Send Link</button>
      </form>
    </div>
  );
}
