import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./lib/useAuthStore";

import { grid } from "ldrs";

function App() {
  const { authUser, authCheck, checkingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (!authUser && checkingAuth) {
    grid.register();
    return (
      <>
        <h1>Hiiii loading</h1>
        <l-grid size="60" speed="1.5" color="black"></l-grid>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        ></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </>
  );
}

export default App;
