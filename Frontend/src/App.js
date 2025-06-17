import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHotel from "./AppHotel"; 
import ListadoPage from "./pages/ListadoPage";
import MapaPage from "./pages/MapaPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppHotel />} />
        <Route path="/reservas" element={<ListadoPage />} />
        <Route path="/mapa" element={<MapaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
