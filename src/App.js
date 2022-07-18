import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";

import LandingPage from "./pages/landing-page/LandingPage";
import Home from "./pages/home/Home";

const App = () => {

  return (

    <>

      <Router>

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />

        </Routes>

      </Router>

    </>

  );

};

export default App;
