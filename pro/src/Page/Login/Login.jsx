// frontend/src/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import hero from '../../assets/herobgimg.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4280";
      
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Authentication failed");
      }

      switch(data.user?.Role) {
        case "Admin":
          navigate("/admin", { state: { user: data.user } });
          break;
        case "Seller":
          navigate("/seller/home", { state: { user: data.user } });
          break;
        default:
          navigate("/home", { state: { user: data.user } });
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.message.includes("Failed to fetch") 
          ? "Cannot connect to server. Please check your network connection."
          : err.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  // New function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles["login-page"]}>
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <h2 className={styles["form-title"]}>Login</h2>

        {error && (
          <p className={styles["error-message"]}>
            {error}
            <br />
            <small>Having trouble? Contact support</small>
          </p>
        )}

        <div className={styles["form-group"]}>
          <label htmlFor="username" className={styles["form-label"]}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles["form-input"]}
            placeholder="Enter your username"
            required
            autoComplete="username"
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["form-label"]}>
            Password
          </label>
          {/* New container for password input and toggle icon */}
          <div className={styles["password-input-container"]}>
            <input
              // Dynamically set type based on showPassword state
              type={showPassword ? "text" : "password"} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["form-input"]}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            {/* Toggle icon/button */}
            <span 
              className={styles["password-toggle-icon"]} 
              onClick={togglePasswordVisibility}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🔓' : '🔒'} {/* lock or unlock-text */}
            </span>
          </div>
        </div>

        <div className={styles["button-group"]}>
          <button 
            type="submit" 
            className={styles["login-btn"]}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <button 
            onClick={handleSignUp} 
            className={styles["signup-btn"]}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}