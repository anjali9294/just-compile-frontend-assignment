import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(name, value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        // Handle successful login
        console.log("Login successful:", response.data);

        localStorage.setItem("token", response.data.token);

        navigate("/todos");
      })
      .catch((error) => {
        console.log("Login failed:", error.response.data);
      });
  };

  return (
    <>
      <div className="nav"></div>
      <div className="main row">
        <div className="left-section col-lg-5 col-10 d-sm-none d-md-block"></div>
        <div className="right-section col-lg-5 col-11 ms-4 d-flex justify-content-center align-items-center">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-secondary">
              Submit
            </button>
            <button
              className="btn btn-lg btn-secondary me-3"
              onClick={() => navigate("/register")}
            >
              signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
