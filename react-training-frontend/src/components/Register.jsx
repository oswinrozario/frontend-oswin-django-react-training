import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
  });
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch companies from an API endpoint
    axios.get(config.BASE_URL1 + "companies/").then((response) => {
      setCompanies(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(config.BASE_URL1 + "register/", values, {
        validateStatus: false,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          navigate("/login");
        } else {
          setError("Registration failed. Invalid Credentials.");
        }
      })
      .catch(() =>
        setError("Registration failed. Invalid Credentials. Please try again.")
      );
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 registerPage">
      <div className="p-4 rounded shadow-lg w-25 border registerForm">
        <div className={`text-danger mb-3 ${error ? "shake" : ""}`}>
          {error && error}
        </div>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter Username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company:
            </label>
            <select
              name="company"
              onChange={(e) =>
                setValues({ ...values, company: e.target.value })
              }
              className="form-select rounded-0"
            >
              <option value="" disabled>
                Select Company
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary w-100 rounded-0 animate__animated animate__fadeIn animate__delay-1s"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
