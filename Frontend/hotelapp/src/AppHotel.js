import React from "react";
import ReservaPage from "./pages/ReservaPage";
import { Toaster } from "react-hot-toast";


function AppHotel() {
  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold m-4">Reserva de Habitación de Hotel</h1>
      </header>
      <Toaster position="top-right" reverseOrder={false} />
      <ReservaPage />
    </div>
  );
}

export default AppHotel;
