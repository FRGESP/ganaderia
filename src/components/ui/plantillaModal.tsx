"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";



function PlantillaModal() {
  const { toast } = useToast();


  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

  

  //Funcion para abrir el modal
  const openModal = () => {
    setIsOpen(true);
  };
  //Funcion para cerrar el modal
  const closeModal = () => {
    
    setIsOpen(false);
  };

  
  return (
    <div>
      <button
          className=" ml-1 rounded-md p-2 hover:bg-gray-200"
          
        >
          <Plus className="text-acento stroke-[5]" size={44} onClick={openModal}/>
        </button>

      {isOpen && (
        <div className="flex items-center justify-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <p className="font-bold text-2xl text-center mb-5">Agregar corral</p>
          <label htmlFor="" className="font-bold text-lg">Nombre:</label>
          <div className="flex justify-center flex-col items-center py-3">
              <input type="text" className="border border-black rounded-md w-full py-2 px-2" placeholder="Inserte el nombre del corral" autoFocus name="nombre"/>
              <div className="flex gap-5 justify-center">
                  <button
                        onClick={closeModal}
                        className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5"
                      >
                        Aceptar
                      </button>
              </div>
          </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default PlantillaModal;
