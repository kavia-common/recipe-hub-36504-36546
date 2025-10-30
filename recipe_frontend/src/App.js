import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/theme.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeForm from "./pages/RecipeForm";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

// PUBLIC_INTERFACE
function App() {
  /** Root app: wraps with AuthProvider and renders route tree with Navbar */
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route
                path="/recipes/new"
                element={
                  <ProtectedRoute>
                    <RecipeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes/:id/edit"
                element={
                  <ProtectedRoute>
                    <RecipeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
