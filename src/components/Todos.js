import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Todos.css";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is not authenticated");
      return;
    }

    axios
      .get("/todos", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch todos:", error);
      });
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        "/todos",
        { title: newTodo },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.log("Failed to create todo:", error);
      });
  };
  // User logout
  const handleLogout = async () => {
    try {
      // Access the token from localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Make a request to the logout route on the backend
        await axios.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Clear the token from localStorage
        localStorage.removeItem("token");
        navigate("/login");
        // Redirect or perform any other action after successful logout
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <>
      <div className="nav d-flex justify-content-between">
        <h4 className="username ms-5 mt-4 text-white">Welcome</h4>
        <button className="btn btn-danger me-5 m-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main row">
        <form
          className="mt-5 ms-5 ps-5 col-lg-3 col-10"
          onSubmit={handleFormSubmit}
        >
          <h2 className="mt-3">Add My Note</h2>
          <div className="mb-3">
            <input
              type="text"
              className="d-block form-control"
              placeholder="Type message here..."
              value={newTodo}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-lg btn-danger">Save</button>
        </form>
        <div className="right-section col-lg-7 col-11 mt-0 d-flex ms-2 justify-content-center align-items-center">
          <div className="ms-5">
            <h2 className="mt-5 ms-3">All Notes</h2>
            <hr />
            <div className="mt-3 ms-3 mt-3">
              {todos.map((todo) => (
                <div key={todo._id}>
                  <div className="items p-3 mt-5">{todo.title}</div>
                  <span className="float-end">10min</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
