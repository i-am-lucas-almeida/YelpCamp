import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { useAuthentication } from "./hooks/useAuthentication";

// context
import { AuthProvider } from "./context/AuthContext";

// pages
import LandingPage from "./pages/landing-page/LandingPage";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import RegisterCamp from "./pages/register-camp/RegisterCamp";
import EditCamp from "./pages/edit-camp/EditCamp";
import CampDetails from "./pages/camp-details/CampDetails";
import Search from "./pages/search/Search";
import Dashboard from "./pages/dashboard/Dashboard";

import ScrollToTop from "./utils/ScrollToTop";
import { PageLoading } from "./components/Loading";

const App = () => {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setUser(user);

    });

  }, [auth]);

  if (loadingUser) {

    return <PageLoading />;

  }

  return (

    <AuthProvider value={{ user }}>

      <Router>

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/new-camp"
            element={user ? <RegisterCamp /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route
            path="/edit-camp/:id"
            element={user ? <EditCamp /> : <Navigate to="/login" />}
          />
          <Route path="/camp/:id" element={<CampDetails />} />
          <Route path="/search" element={<Search />} />

        </Routes>

      </Router>

    </AuthProvider>

  );

};

export default App;
