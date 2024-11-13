"use client";
import { Search, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function GuiasDashboard() {
  //Interface para las guias
  interface Guias {
    REEMO: string;
    Fecha: string;
    Nombre: string;
    Motivo: string;
    ESTADO: string;
  }

  //Guarda la informacion de los inputs
  const [inputValues, setInputValue] = useState({
    inputReemo: "",
    selectFilter: "",
  });

  //Guarda la informacion de las guias obtenidas
  const [guias, setGuias] = useState<Guias[]>([]);

  const handleChange = (e: any) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  //Controla cuando se selecciona un botón en la tabla
  const handleSelectGuia = (reemo: string) => {
    console.log(reemo);
  }

  const getGuias = async () => {
    console.log(inputValues);
    const response = await axios.post("/api/users/admin/guias", inputValues);
    setGuias(response.data);
    console.log(response.data);
  };

  //Para que se ejeucte cada vez que se renderiza
  useEffect(() => {
    getGuias();
  }, []);

  return (
    <div className="w-full h-[90vh] p-4 flex flex-col">
      <div className="flex mt-5">
        <input
          type="text"
          name="inputReemo"
          id="inputReemo"
          onChange={handleChange}
          className=" py-4 rounded-full text-lg px-2 w-full flex-grow border-2 border-gray-500"
        />
        <select
          name="selectFilter"
          id="selectFilter"
          className="border-2 border-gray-500 rounded-lg ml-3 font-bold px-2"
          onChange={handleChange}
        >
          <option value="">Todas</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Completada">Completada</option>
        </select>
        <button
          className=" ml-1 rounded-md p-2 hover:bg-gray-200"
          onClick={getGuias}
        >
          <Search size={44} />
        </button>
      </div>
      <div className="border-2 border-black mt-16 h-[80%] rounded-lg shadow-lg">
        <table>
          <thead>
            <tr>
              <th>REEMO</th>
              <th>Fecha</th>
              <th>Empleado</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {guias.map((guia) => (
              <tr key={guia.REEMO}>
                <td>{guia.REEMO}</td>
                <td>{guia.Fecha}</td>
                <td>{guia.Nombre}</td>
                <td>{guia.Motivo}</td>
                <td>{guia.ESTADO}</td>
                <td className="flex justify-center">
                  <Link className=" bg-acento hover:bg-green-700 rounded-sm" href={`/users/admin/guias/${guia.REEMO}`}>
                    <MoveRight className="text-white m-1" />
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuiasDashboard;
