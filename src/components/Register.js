import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };
    axios
      .post("/register", userData)
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        // Handle registration error
        console.log("Registration failed:", error.response.data);
        // Display error message or perform other error handling actions
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors.map((err) => err.msg));
        } else {
          setErrors(["Failed to register user"]);
        }
      });
  };

  return (
    <>
      <div className="nav"></div>
      <div className="main row">
        <div className="left-section col-lg-5 col-10 d-sm-none d-md-block  "></div>
        <div className="right-section col-lg-5 col-11 ms-4 d-flex justify-content-center align-items-center">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="User Name"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
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
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn  btn-lg btn-secondary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
