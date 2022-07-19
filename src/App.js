import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";

import LandingPage from "./pages/landing-page/LandingPage";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

const App = () => {

  return (

    <>

      <Router>

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>

      </Router>

    </>

  );

};

export default App;
