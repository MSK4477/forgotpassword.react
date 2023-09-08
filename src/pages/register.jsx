// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from "axios"
import backEndUrl from "../config.js"

const Register = () => {
  const navigate = useNavigate();
const initialStage = {
  name: '',
  email: '',
  password: '',
}
  const [formData, setFormData] = useState(initialStage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${backEndUrl}/register`, formData);
  
      if (res.status === 200) {
        navigate("/home");
      } else {
        console.log("Request failed with status:", res.status);
      }
  
      setFormData(initialStage);
    } catch (error) {
      alert("email already in use")
      console.error("An error occurred:", error);
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            minLength={5}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div><br /><br />
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div><br /><br />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            minLength={8}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div><br />
        <p>Already have an account <Link to={"/login"}>login</Link> </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
