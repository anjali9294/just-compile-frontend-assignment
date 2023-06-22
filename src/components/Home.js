import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav"></div>
      <div className="main row">
        <div className="left-section col-lg-5 col-10 "></div>
        <div className="right-section col-lg-5 col-11 ms-4">
          <div className="right-top"></div>
          <div className="right-top"></div>
          <div className="ms-5">
            <h1 className="mt-5 ms-3">Welcome</h1>
            <div className="d-flex mt-3">
              <div
                className=" btn  btn-lg btn-secondary login"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
              <div
                className="btn btn-lg btn-secondary ms-3 Signup"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
