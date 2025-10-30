import { Link } from "react-router-dom";

/**
 * RecipeCard: small preview card for recipe in grid.
 */
export default function RecipeCard({ recipe }) {
  return (
    <div className="card" role="article" aria-label={`Recipe ${recipe?.title}`}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <h3 style={{ margin: 0 }}>{recipe?.title}</h3>
        {recipe?.is_owner && <span className="badge">You</span>}
      </div>
      <p className="helper" style={{ marginTop: 8 }}>
        {recipe?.description || "No description provided."}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Link to={`/recipes/${recipe?.id}`} className="btn btn-primary">View</Link>
        {recipe?.is_owner && (
          <Link to={`/recipes/${recipe?.id}/edit`} className="btn">Edit</Link>
        )}
      </div>
    </div>
  );
}
