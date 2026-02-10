import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoute";

import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      }
    } catch (err) {
      console.error("getUser error:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoListPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
