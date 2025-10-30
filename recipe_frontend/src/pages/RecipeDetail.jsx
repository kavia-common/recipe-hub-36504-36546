import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";
import useAuth from "../hooks/useAuth";

export default function RecipeDetail() {
  const { id } = useParams();
  const { detail, get, loading, error, remove } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) get(id);
  }, [id, get]);

  const canEdit = detail && (detail.is_owner || detail.owner_id === user?.id || detail.owner_email === user?.email);

  const onDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    const ok = await remove(id);
    if (ok) {
      navigate("/");
    }
  };

  if (loading && !detail) return <div className="card">Loading...</div>;
  if (error) return <div className="card" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#991b1b" }}>{error}</div>;
  if (!detail) return <div className="card">Recipe not found.</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h2 style={{ margin: 0 }}>{detail.title}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {canEdit && (
            <>
              <Link className="btn" to={`/recipes/${id}/edit`}>Edit</Link>
              <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            </>
          )}
          <Link className="btn" to="/">Back</Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p className="helper" style={{ marginTop: 0 }}>{detail.description || "No description."}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="badge">Servings: {detail.servings || "-"}</span>
          <span className="badge">Prep: {detail.prep_time || "-"}</span>
          <span className="badge">Cook: {detail.cook_time || "-"}</span>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <div className="card">
          <h3>Ingredients</h3>
          <ul>
            {(detail.ingredients || []).map((i, idx) => (
              <li key={idx}>{typeof i === "string" ? i : i.name || JSON.stringify(i)}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Steps</h3>
          <ol>
            {(detail.steps || []).map((s, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {typeof s === "string" ? s : s.text || JSON.stringify(s)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
