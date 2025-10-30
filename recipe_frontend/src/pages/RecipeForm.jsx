import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

const normalizeList = (text) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function RecipeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { get, detail, create, update, loading, error, setDetail } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  useEffect(() => {
    if (isEdit) get(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id]);

  useEffect(() => {
    if (detail && isEdit) {
      setTitle(detail.title || "");
      setDescription(detail.description || "");
      setIngredientsText((detail.ingredients || []).join("\n"));
      setStepsText((detail.steps || []).join("\n"));
    }
  }, [detail, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      ingredients: normalizeList(ingredientsText),
      steps: normalizeList(stepsText),
    };
    try {
      if (isEdit) {
        await update(id, payload);
        setDetail(null);
      } else {
        const created = await create(payload);
        const newId = created?.id;
        if (newId) {
          navigate(`/recipes/${newId}`);
          return;
        }
      }
      navigate("/");
    } catch {
      // error state is already set by hook
    }
  };

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <div className="page-header">
        <h2 style={{ margin: 0 }}>{isEdit ? "Edit recipe" : "Create recipe"}</h2>
        <span className="badge">{isEdit ? "Edit" : "New"}</span>
      </div>

      <form className="card" onSubmit={onSubmit}>
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label>Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Description</label>
            <textarea className="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Ingredients (one per line)</label>
            <textarea className="textarea" rows={6} value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} />
          </div>
          <div>
            <label>Steps (one per line)</label>
            <textarea className="textarea" rows={6} value={stepsText} onChange={(e) => setStepsText(e.target.value)} />
          </div>

          {error && <div className="card" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#991b1b" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="btn" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
