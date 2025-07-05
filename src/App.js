import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CarbonEmissions from './pages/CarbonEmissions';
import EnergyStats from './pages/EnergyStats';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div className="fade-page">
      {location.pathname === '/' && <Hero />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CarbonEmissions />} />
        <Route path="/energy" element={<EnergyStats />} />
      </Routes>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
