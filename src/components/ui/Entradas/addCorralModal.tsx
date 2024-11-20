"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import axios from "axios";


function AddcorralModal() {
  const { toast } = useToast();

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

    //Guarda la informacion del input
    const [inputValue, setInputValue] = useState({
      nombre: "",
    });

  //Funcion para abrir el modal
  const openModal = () => {
    setIsOpen(true);
  };
  //Funcion para cerrar el modal
  const closeModal = () => {
    
    setIsOpen(false);
  };

  //Funcion para agregar un corral
  const handleAddCorral = async () => {
    if(inputValue.nombre == ""){
        toast({
            title: "Nombre vacío",
            description: "El nombre del corral no puede estar vacío",
            variant: "destructive",
        });
        return;
    }
    const response = await axios.post(`/api/users/entradas/corrales/1`, {Nombre: inputValue.nombre});
    if(response.status == 200){
        toast({
            title: "Corral agregado",
            description: "El corral ha sido agregado correctamente",
            variant: "success",
        });
        
    } else{
        toast({
            title: "Error",
            description: "No se pudo agregar el corral",
            variant: "destructive",
        });
    }
    closeModal();
    window.location.reload();
  }

  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
  })
}
  
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
                <input type="text" className="border border-black rounded-md w-full py-2 px-2" placeholder="Inserte el nombre del corral" autoFocus name="nombre" onChange={handleChange}/>
                <div className="flex gap-5 justify-center">
                    <button
                          onClick={closeModal}
                          className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleAddCorral}
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

export default AddcorralModal;
