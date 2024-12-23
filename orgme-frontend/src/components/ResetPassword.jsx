import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  // console.log("token", token);

  const [submitStatus, setSubmitStatus] = useState(false);
  const [formData, setFormData] = useState({
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

  //function to validate password
  const validatePassword = (e) => {
    const password = e.target.value;
    let errorMsg = undefined;
    const passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      errorMsg = "Did you somehow remeber your old password? :)";
    } else if (password.length < 8) {
      errorMsg = "8 or more characters, no exceptions! >(";
    } else if (!passPattern.test(password)) {
      errorMsg =
        "Spice up your password, add at least one letter and one number ;)";
    }
    setErrors((prevState) => {
      return {
        ...prevState,
        passError: errorMsg,
      };
    });
  };

  //function to validate confirm password
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!errors.emailError && !errors.passError && !errors.confirmPass) {
      setSubmitStatus(true);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      axios
        .patch(`http://localhost:5000/api/user/resetPassword/${token}`, {
          pass: formData.password,
          confirmPass: formData.confirmPass,
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
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
        <h2>Reset your password</h2>
        <p>Enter a new password for the account</p>
        <input
          type="password"
          name="password"
          placeholder="Enter New Password"
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
            Remembered your password?{" "}
            <span>
              <Link className="login-link" to={"/login"}>
                Login
              </Link>
            </span>
          </p>
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
