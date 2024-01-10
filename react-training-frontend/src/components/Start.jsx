import axios from "axios";
import "../styles/start.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-5 rounded shadow-lg w-25 border loginForm">
        <h2 className="text-center mb-4">Welcome</h2>
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary btn-lg mb-3"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
