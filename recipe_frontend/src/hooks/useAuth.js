/**
 * PUBLIC_INTERFACE
 * useAuth returns auth state and actions from AuthContext.
 */
import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  return useAuthContext();
}
