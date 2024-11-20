"use client";

import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from "zod";

interface AnimalDashboardProps {
  AreteAnimal: string;
  Admin: boolean;
}

function AnimalDashboard({ AreteAnimal, Admin }: AnimalDashboardProps) {
  //Interface para el animal
  interface Animal {
    Arete: string;
    REEMO: string;
    Sexo: string;
    Meses: number;
    Clasificacion: string;
    Estado: string;
    Corral: string;
    Fecha: string;
    Peso: number;
    Precio: number;
    PrecioSugerido: number;
  }

  //Interface para la alimentación
  interface Alimentacion {
    Dieta: string;
    Fecha: string;
    Gasto: number;
    Id: number;
  }

  //Guarda la información del animal
  const [animal, setAnimal] = useState<Animal>();

  //Guarda la información de la alimentación
  const [alimentacion, setAlimentacion] = useState<Alimentacion[]>([]);

  //Controla el estado de edición
  const [isEditing, setIsEditing] = useState(false);

    //Obtiene la información del animal
    const getAnimal = async () => {
      const response = await axios.get(`/api/entradas/corrales/animales/${AreteAnimal}`);
      console.log(response.data);  
      setAnimal(response.data[0][0]);
      console.log(response.data[1]);
      setAlimentacion(response.data[1]);
    };

    useEffect(() => {
        getAnimal();
    }, []);

  return (
    <div className="p-10 h-[90vh]">
      <div className="flex justify-center items-center gap-3">
        <p className="font-bold text-3xl">Arete: {AreteAnimal}</p>
      </div>
      <div className="mt-10">
        <table>
          <thead>
            <tr>
              <th>Arete</th>
              <th>REEMO</th>
              <th>Sexo</th>
              <th>Meses</th>
              <th>Clasificación</th>
              <th>Estado</th>
              <th>Corral</th>
              <th>Fecha</th>
              <th>Peso</th>
              {Admin && <th>Precio Compra</th>}
              {animal?.Precio && Admin ? <th>Precio Sugerido</th> : ''}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{animal?.Arete}</td>
                <td>{animal?.REEMO}</td>
                <td>{animal?.Sexo}</td>
                <td>{animal?.Meses}</td>
                <td>{animal?.Clasificacion}</td>
                <td>{animal?.Estado}</td>
                <td>{animal?.Corral}</td>
                <td>{animal?.Fecha}</td>
                <td>{animal?.Peso} Kg</td>
                {Admin && <td>{!animal?.Precio ? 'Falta' : `$${animal?.Precio}`}</td>}
                {animal?.Precio && Admin ? <td>${animal.PrecioSugerido}</td> : ''}
                <td><div className="flex justify-center items-center">
                    <button
                      className={`${
                        !isEditing
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-acento hover:bg-green-600"
                      } rounded-md p-1 max-h-10`}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {!isEditing ? (
                        <Pencil className="text-white h-7 w-7" />
                      ) : (
                        <Check className="text-white h-7 w-7" />
                      )}
                    </button>
                </div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">
          <div>
            <p className="font-bold text-3xl mt-5 text-center mb-5">Alimentación</p>
            {alimentacion.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Dieta</th>
                    <th>Fecha</th>
                    {Admin && <th>Gasto</th>}
                  </tr>
                </thead>
                <tbody>
                  {alimentacion.map((alimento) => (
                    <tr key={alimento.Id}>
                      <td>{alimento.Dieta}</td>
                      <td>{alimento.Fecha}</td>
                      {Admin && <td>${alimento.Gasto}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            ):(<div className="min-h-20 w-full h-[calc(100%-4.7rem)] flex justify-center items-center border border-black rounded-md">
              <p className="font-bold text-3xl mt-5">
                Sin datos aún
              </p>
            </div>)}
          </div>
          <div>
          <p className="font-bold text-3xl mt-5 text-center mb-5">Medicamento</p>
          <div className="min-h-20 w-full h-[calc(100%-4.7rem)] flex justify-center items-center border border-black rounded-md">
                <p className="font-bold text-3xl mt-5">
                  Sin datos aún
                </p>
              </div>
          </div>
        </div>
    </div>
  );
}

export default AnimalDashboard;
