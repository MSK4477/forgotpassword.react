import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../config.js"

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${backEndUrl}/resetPassword/${id}?token=${token}`, {
        password: newPassword,
      });

      if (response.data.Status === "Success") {
        alert("password reseted successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          minLength={8}
          placeholder="New password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />{" "}
        <br />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          minLength={8}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <br />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
