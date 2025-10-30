import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErr(res.error || "Login failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="page-header">
        <h2>Welcome back</h2>
        <span className="badge">Sign in</span>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {err && <div className="card" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#991b1b" }}>{err}</div>}
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="helper">
            No account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
