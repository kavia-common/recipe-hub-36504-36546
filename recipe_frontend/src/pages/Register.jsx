import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await register(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setErr(res.error || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="page-header">
        <h2>Create account</h2>
        <span className="badge">Register</span>
      </div>
      <form className="card" onSubmit={onSubmit}>
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {err && <div className="card" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#991b1b" }}>{err}</div>}
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Creating..." : "Register"}
          </button>
          <p className="helper">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
