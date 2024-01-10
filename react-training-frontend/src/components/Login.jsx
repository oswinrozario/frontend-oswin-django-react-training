import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(config.BASE_URL1 + "login/", values, {
        validateStatus: false,
      })
      .then((result) => {
        if (result.data.access_token) {
          localStorage.setItem("token", result.data.access_token);
          navigate("/dashboard");
        } else {
          setError("Invalid Login Credentials");
        }
      })
      .catch((err) => setError("Invalid Login Credentials"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded shadow-lg w-25 border loginForm">
        <div className="text-danger mb-3">{error && error}</div>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-primary w-100 rounded-0">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
