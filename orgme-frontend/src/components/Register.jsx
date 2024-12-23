import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    emailError: undefined,
    passError: undefined,
    confirmPass: undefined,
  });

  const navigate = useNavigate();

  //function to validate email
  const validateEmail = (e) => {
    let errorMsg = undefined;
    const emailPattern = /^[^\s@A-Z]+@[^\s@A-Z]+\.[^\s@A-Z]+$/;

    if (!e.target.value) {
      //check if there is no email address
      errorMsg = "What! you don't have an email? :/";
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
        passError: errorMsg,
      };
    });
  };

  //function to validate email
  const validateConfirmPass = (e) => {
    const password = formData.password;
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

  //function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //function to handle submitting of form
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(errors);

    if (!errors.emailError && !errors.passError && !errors.confirmPass) {
      setSubmitStatus(true);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      axios
        .post("http://localhost:5000/api/user/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: "user",
          resetPasswordToken: null,
          resetPasswordExpires: null,
        })
        .then((res) => {
          alert("Account Successfully Created!");
          navigate("/login");
        })
        .catch((err) => {
          err.status === 409 && alert(err.response.data.message);
        })
        .finally(() => setSubmitStatus(false));
    }
  }, [submitStatus]);

  // console.log(errors.emailError);
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        <p>
          Ready to conquer your day, one task at a time?
          <br />
          Let's get started!
        </p>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required={true}
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          required={true}
          onChange={handleChange}
        />
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
          onBlur={validatePassword}
        />
        {errors.passError && (
          <p className="form-error-msg">{errors.passError}</p>
        )}
        <input
          type="password"
          name="confirmPass"
          placeholder="Confirm Password"
          value={formData.confirmPass}
          required={true}
          onChange={handleChange}
          onBlur={validateConfirmPass}
        />
        {errors.confirmPass && (
          <p className="form-error-msg">{errors.confirmPass}</p>
        )}
        <div className="signup-options-div">
          <p>
            Already have an account?{" "}
            <span>
              <Link className="login-link" to={"/login"}>
                Login
              </Link>
            </span>
          </p>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
