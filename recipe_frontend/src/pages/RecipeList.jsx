import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";
import useAuth from "../hooks/useAuth";
import RecipeCard from "../components/RecipeCard";

export default function RecipeList() {
  const { recipes, loading, error, list } = useRecipes();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [ownerOnly, setOwnerOnly] = useState(false);
  const [page] = useState(1); // placeholder
  const [pageSize] = useState(12); // placeholder

  useEffect(() => {
    list({ page, page_size: pageSize, q: query || undefined });
  }, [list, page, pageSize, query]);

  const filtered = useMemo(() => {
    let items = recipes || [];
    if (ownerOnly) {
      items = items.filter((r) => r.is_owner || r.owner_id === user?.id || r.owner_email === user?.email);
    }
    if (query) {
      const q = query.toLowerCase();
      items = items.filter((r) => (r.title || "").toLowerCase().includes(q));
    }
    return items;
  }, [recipes, ownerOnly, query, user]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0 }}>Browse Recipes</h2>
          <p className="helper">Discover and manage your favorite recipes.</p>
        </div>
        {user && (
          <Link to="/recipes/new" className="btn btn-primary">New Recipe</Link>
        )}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            className="input"
            style={{ minWidth: 240 }}
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label className="helper" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={ownerOnly}
              onChange={(e) => setOwnerOnly(e.target.checked)}
            />
            Mine only
          </label>
          <span className="badge">Pagination placeholder</span>
        </div>
      </div>

      {loading && <div className="card">Loading recipes...</div>}
      {error && <div className="card" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#991b1b" }}>{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="empty">No recipes found.</div>
      )}

      <div className="grid grid-3">
        {filtered.map((r) => (
          <RecipeCard recipe={r} key={r.id || r.title} />
        ))}
      </div>
    </div>
  );
}
