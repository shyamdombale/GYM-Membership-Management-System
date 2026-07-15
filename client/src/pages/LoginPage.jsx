import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/LoginPage.css";

import hero from "../assets/hero.avif";
import girl from "../assets/fitness-girl.jpg";
import gym from "../assets/gym-bg.jpg";

import { api } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

  try {
  console.log("Sending:", email, password);

  const data = await api.login({
    email,
    password,
  });

  console.log("Response:", data);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  navigate("/dashboard");
}catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="badge">IRONGRID GYM OS</span>

          <h1>
            BUILD YOUR
            <br />
            STRONGEST SELF
          </h1>

          <p>
            Join India's premium fitness platform.
            Train smarter and transform yourself.
          </p>

          <div className="hero-stats">
            <div>
              <h2>25K+</h2>
              <span>Members</span>
            </div>

            <div>
              <h2>120+</h2>
              <span>Trainers</span>
            </div>

            <div>
              <h2>35</h2>
              <span>Branches</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="login-side"
        style={{
          backgroundImage: `url(${gym})`,
        }}
      >
        <div className="glass-card">

          <img
            src={girl}
            alt="Fitness"
            className="girl-image"
          />

          <h2>Welcome Back 👋</h2>

          <p>Login to continue your fitness journey.</p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "ENTER THE GRID"}
            </button>

          </form>

          <div className="bottom-text">
            New Member?

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}