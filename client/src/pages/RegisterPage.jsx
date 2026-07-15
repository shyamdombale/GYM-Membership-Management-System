import { useState } from "react";
import {
  Dumbbell,
  User,
  Mail,
  Lock,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "Koregaon Park",
    plan: "Basic Monthly",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.register({
        ...formData,
        role: "member",
      });

      setSuccess(
        "Membership created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-glow glow-one"></div>
      <div className="login-glow glow-two"></div>

      <div className="login-card register-card">

        <div className="login-brand">

          <div className="brand-icon">
            <Dumbbell size={26} />
          </div>

          <div>
            <h1>IRONGRID</h1>
            <span>GYM OS</span>
          </div>

        </div>

        <div className="login-heading">

          <span>JOIN THE GRID</span>

          <h2>
            START YOUR
            <br />
            STRONGER ERA.
          </h2>

          <p>
            Create your membership, choose your gym branch
            and start your fitness journey.
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <div className="input-box">

            <User size={18} />

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <label>Email Address</label>

          <div className="input-box">

            <Mail size={18} />

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <label>Password</label>

          <div className="input-box">

            <Lock size={18} />

            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />

          </div>

          <label>Gym Branch</label>

          <div className="input-box">

            <MapPin size={18} />

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="Koregaon Park">
                Koregaon Park
              </option>

              <option value="Baner">
                Baner
              </option>

              <option value="Viman Nagar">
                Viman Nagar
              </option>
            </select>

          </div>

          <label>Membership Plan</label>

          <div className="input-box">

            <CreditCard size={18} />

            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
            >
              <option value="Basic Monthly">
                Basic Monthly
              </option>

              <option value="Standard Monthly">
                Standard Monthly
              </option>

              <option value="Elite Annual">
                Elite Annual
              </option>
            </select>

          </div>

          {error && (
            <div className="auth-message auth-error">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-message auth-success">
              {success}
            </div>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >

            {loading
              ? "CREATING MEMBERSHIP..."
              : "CREATE MEMBERSHIP"}

            {!loading && (
              <ArrowRight size={18} />
            )}

          </button>

        </form>

        <div className="register-link">

          Already a member?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

        </div>

      </div>

    </div>
  );
}