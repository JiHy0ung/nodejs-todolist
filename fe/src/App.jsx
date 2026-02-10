import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoute";

import api from "./utils/api";
import AppLayout from "./layout/AppLayout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout user={user} setUser={setUser} />}>
        <Route
          index
          element={
            <PrivateRoute user={user}>
              <TodoListPage user={user} />
            </PrivateRoute>
          }
        />

        <Route
          path="login"
          element={<LoginPage user={user} setUser={setUser} />}
        />

        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
