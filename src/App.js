import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import ScrollToTop from "./utils/ScrollToTop";

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

    return <p>Carregando...</p>;

  }

  return (

    <AuthProvider value={{ user }}>

      <Router>

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-camp" element={<RegisterCamp />} />

        </Routes>

      </Router>

    </AuthProvider>

  );

};

export default App;
