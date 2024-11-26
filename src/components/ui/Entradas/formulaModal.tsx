"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

//Interfaz para el modal
interface FormulaModalProps {
  CorralProp: number;
  CantidadAnimalesProp: number;
}

function FormulaModal({ CorralProp, CantidadAnimalesProp }: FormulaModalProps) {
  const { toast } = useToast();

  //Interface de la formula
  interface FormulaInter {
    Articulo: string;
    Porcion: number;
    Unidad: string;
  }

  //Interface para los ingredientes faltantes
  interface FaltanteInter {
    Articulo: string;
    Cantidad: number;
    Unidad: string;
  }

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

  //Guarda la informacion de los ingredientes
  const [formula, setFormula] = useState<FormulaInter[]>([]); //Guarda la informacion de la formula

  //Guarda la informacion de los ingredientes faltantes
  const [faltantes, setFaltantes] = useState<FaltanteInter[]>([]);

  //Controla si existen ingredientes faltantes
  const [existenFaltantes, setExistenFaltantes] = useState(false);

  //Guarda la informacion de la formula

  //Funcion para abrir el modal
  const openModal = () => {
    setIsOpen(true);
  };
  //Funcion para cerrar el modal
  const closeModal = () => {
    if(existenFaltantes){
      toast({
        title: "No se puede registrar la alimentación",
        description: "No hay suficientes ingredientes para alimentar a los animales",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Alimentación registrada",
        description: "La alimentación se ha registrado correctamente",
        variant: "success",
      });
    }
    setIsOpen(false);
  };

  //Cuando se alimenta el corral
  const handleAlimentacion = async () => {
    const response = await axios.put(`/api/entradas/corrales`, {
      Corral: CorralProp,
    });
    if (response.data[0][0].Cantidad) {
      setExistenFaltantes(true);
      setFaltantes(response.data[0]);
    } else {
      setFormula(response.data[0]);
    }
    openModal();
  };

  return (
    <div>
      <button
        className=" bg-acento hover:bg-acentohover p-2 px-20 text-white ml-5 rounded-md max-h-12"
        onClick={handleAlimentacion}
      >
        Alimentar
      </button>

      {isOpen && (
        <div className="flex items-center justify-center">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="my-3">
                {existenFaltantes ? (
                  <h2 className="text-2xl font-bold mb-4 text-red-700 text-center">
                    Hacen falta los siguientes Ingredientes para{" los "}
                    {CantidadAnimalesProp} animales:
                  </h2>
                ) : (
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Se ocuparán los siguientes Ingredientes para{" "}
                    {CantidadAnimalesProp} animales:
                  </h2>
                )}
              </div>
              <table>
                <thead>
                  <tr className="text-lg">
                    <th>Ingrediente</th>
                    {existenFaltantes ? (
                      <th>Cantidad Faltante</th>
                    ) : (
                      <th>Porción</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {existenFaltantes
                    ? faltantes.map((faltante) => (
                        <tr key={faltante.Articulo} className="text-lg">
                          <td>{faltante.Articulo}</td>
                          <td>
                            {faltante.Cantidad} {faltante.Unidad}
                          </td>
                        </tr>
                      ))
                    : formula.map((ingrediente) => (
                        <tr key={ingrediente.Articulo} className="text-lg">
                          <td>{ingrediente.Articulo}</td>
                          <td>
                            {ingrediente.Porcion} {ingrediente.Unidad}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormulaModal;
