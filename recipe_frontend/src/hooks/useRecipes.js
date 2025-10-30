import { useCallback, useEffect, useState } from "react";
import api from "../api/client";

/**
 * PUBLIC_INTERFACE
 * useRecipes provides list/detail CRUD helpers with loading and error states.
 */
export default function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const list = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Try common endpoints
      let resp;
      try {
        resp = await api.get("/recipes", { params });
      } catch {
        resp = await api.get("/api/recipes", { params });
      }
      setRecipes(resp?.data?.items || resp?.data || []);
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      let resp;
      try {
        resp = await api.get(`/recipes/${id}`);
      } catch {
        resp = await api.get(`/api/recipes/${id}`);
      }
      setDetail(resp?.data || null);
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to load recipe");
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      let resp;
      try {
        resp = await api.post("/recipes", payload);
      } catch {
        resp = await api.post("/api/recipes", payload);
      }
      return resp?.data;
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to create recipe");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      let resp;
      try {
        resp = await api.put(`/recipes/${id}`, payload);
      } catch {
        resp = await api.put(`/api/recipes/${id}`, payload);
      }
      return resp?.data;
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to update recipe");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      try {
        await api.delete(`/recipes/${id}`);
      } catch {
        await api.delete(`/api/recipes/${id}`);
      }
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      return true;
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to delete recipe");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // convenience auto-load list on mount
  useEffect(() => {
    list();
  }, [list]);

  return {
    recipes,
    detail,
    loading,
    error,
    list,
    get,
    create,
    update,
    remove,
    setRecipes,
    setDetail,
  };
}
