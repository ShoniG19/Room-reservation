import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="bg-black p-4">
      <div className="flex justify-between container mx-auto">
        <h1 className="text-white text-lg font-bold">Hotel App</h1>
        <span className="flex space-x-4">
          {isHome ? (
            <Link to="/reservas" className="text-white hover:text-gray-400">
              Listar Reservas
            </Link>
          ):(
            <Link to="/" className="text-white hover:text-gray-400">
              Nueva Reserva
            </Link>
          )}
          <Link to="/mapa" className="text-white hover:text-gray-400">
            Mapa de Habitaciones
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
