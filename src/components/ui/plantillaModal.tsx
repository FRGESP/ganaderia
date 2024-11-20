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
            <p>Hola</p>
            <button
                  onClick={closeModal}
                  className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                >
                  Cerrar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantillaModal;
