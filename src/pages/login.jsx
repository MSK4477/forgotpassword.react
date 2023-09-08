// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../config.js";

const Login = () => {
  const navigate = useNavigate();
  const initialStage = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialStage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const res = await axios.post(`${backEndUrl}/login`, formData)
      
      try {
        if (res.status === 200) {
          alert("user Loggedin successfully");
          navigate("/home");
          localStorage.setItem("user", JSON.stringify(formData.email));
        }

        if (
          localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))
        ) {
          return <Navigate to={"/home"} replace />;
        }
      }
      catch(err) {
      
          alert("incorrect password or email");
      }

    setFormData(initialStage);
  };

  return (
    <div>
      <h1>Loign</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
           
            id="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <Link to={"/forgotPassword"}>forgotPassword</Link>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
