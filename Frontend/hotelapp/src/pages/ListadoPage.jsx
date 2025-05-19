import React, { useEffect, useState} from 'react'

import ReservasFilter from '../components/ReservaFiltros'
import ReservasTable from '../components/ReservaTabla'

import { getReservas, getReservasConFiltros } from '../api/reservaApi'

const ListadoPage = () => {
    const [filtros, setFiltros] = useState({
    hotelId: "",
    fechaIngreso: "",
    fechaSalida: "",
    cliente: "",
  });

  const [reservas, setReservas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const data = await getReservas();
        setReservas(data);
      } catch (err) {
        console.error("Error al cargar reservas", err);
      }
    };

    cargarReservas();
  }, []);

  useEffect(() => {
    buscar(0);
  }, [pageSize]);

  const buscar = async (pagina = 0) => {
    console.log("pagina",pagina)
    try {
      const {data,total} = await getReservasConFiltros(filtros, pagina, pageSize);
      setReservas(data);
      setTotal(total);
      setPage(pagina);
    } catch (err) {
      alert("Error al obtener reservas.");
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold m-4">Reservaciones</h1>
        <ReservasFilter filtros={filtros} setFiltros={setFiltros} onBuscar={buscar} />
        { reservas.length >0 ? (
          <>
          <ReservasTable reservas={reservas} />
          <div className="flex justify-center my-4 gap-2">
            <button
              onClick={() => buscar(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2">Página {page + 1} </span>
            <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                }}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            <button
              onClick={() => buscar(page + 1)}
              disabled={(page + 1) * pageSize >= total}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
          </>
        ) : ( 
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">No se han realizado Reservas</h2>
            <p className="text-gray-600">Intente con crear una reserva nueva.</p>
          </div>
        )}
    </div>
  )
}

export default ListadoPage
