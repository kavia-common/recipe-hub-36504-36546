import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, token } = useAuth();

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="page-header">
        <h2 style={{ margin: 0 }}>Your profile</h2>
        <span className="badge">Account</span>
      </div>

      <div className="card">
        {!user ? (
          <div>Not signed in.</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <div><strong>Email:</strong> {user.email || "-"}</div>
            {user.name && <div><strong>Name:</strong> {user.name}</div>}
            <div className="helper"><strong>Token:</strong> {token ? token.substring(0, 28) + "..." : "None"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
