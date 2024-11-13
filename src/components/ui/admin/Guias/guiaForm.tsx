"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface GuiaFormProps {
  idGuia: String;
}

function GuiaForm({ idGuia }: GuiaFormProps) {

interface GuiasInfo {
    REEMO: string;
    Fecha: string;
    Nombre: string;
    Motivo: string;
    ESTADO: string;
}

interface AnimalesInfo {
    Arete: string;
    Sexo: string;
    Meses: string;
    Clasificacion: string;
    Estado: string;
    Corral: string;
    Peso: number;
}

//Guarda la informacion de la guia
const [guiaInfo, setGuia] = useState<GuiasInfo>();

//Guarda la informacion de los animales de la guia
const [animalesInfo, setAnimales] = useState<AnimalesInfo[]>([]);

//Obtiene la informacion de la guia
const getGuiaInfo = async () => {
    const response = await axios.get(`/api/users/admin/guias/${idGuia}`);
    console.log("Data")
    console.log(response.data);
    console.log("Data 0")
    console.log(response.data[0]);
    setGuia(response.data[0][0]);
    setAnimales(response.data[1]);
}

useEffect(() => {
    getGuiaInfo();
},[]);


  return (
    <div className="h-[90vh] w-full p-5 flex flex-col items-center">
      <div className="flex h-10 w-full justify-center gap-14">
        <h1 className="font-bold text-3xl">REEMO {idGuia}</h1>
        <h1 className="font-bold text-3xl">Fecha de registro: {guiaInfo?.Fecha}</h1>
        <h1 className="font-bold text-3xl">Motivo: {guiaInfo?.Motivo}</h1>
        <h1 className="font-bold text-3xl">Estado: {guiaInfo?.ESTADO}</h1>
      </div>
      <div className="w-[80%] border-2 border-black rounded-md shadow-md h-[80%] mt-8 p-7 ">
        <div className=" w-full h-full flex flex-col gap-2 overflow-y-auto">
          <div className="flex h-10 w-full  justify-center">
            <h1 className="font-bold text-2xl mb-5">Datos de la Guia</h1>
          </div>
          <label htmlFor="" className="text-xl font-bold">
            PSG:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <label htmlFor="" className="text-xl font-bold">
            Nombre:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <label htmlFor="" className="text-xl font-bold">
            Razón Social:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <label htmlFor="" className="text-xl font-bold">
            Localidad:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <label htmlFor="" className="text-xl font-bold">
            Municipio:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <label htmlFor="" className="text-xl font-bold">
            Estado:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
          />
          <div className="flex h-10 w-full  justify-center">
            <h1 className="font-bold text-2xl mt-5">Datos de los animales</h1>
          </div>
          <div className="w-full h-auto border border-black mt-5">
            <table>
                <thead>
                    <tr className="sticky top-0">
                        <th>Arete</th>
                        <th>Sexo</th>
                        <th>Meses</th>
                        <th>Clasificación</th>
                        <th>Peso</th>
                        <th>Corral</th>
                        <th>Estado</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {animalesInfo.map((animal) => (
                        <tr key={animal.Arete} className="hover:bg-gray-100">
                            <td>{animal.Arete}</td>
                            <td>{animal.Sexo}</td>
                            <td>{animal.Meses}</td>
                            <td>{animal.Clasificacion}</td>
                            <td>{animal.Peso}</td>
                            <td>{animal.Corral}</td>
                            <td>{animal.Estado}</td>
                            <td><input type="text" className="border border-black"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuiaForm;
