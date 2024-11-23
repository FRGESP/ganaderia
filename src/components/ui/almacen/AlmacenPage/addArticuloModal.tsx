"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import axios from "axios";

function AddArticuloModal() {
  const { toast } = useToast();

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

  //Guarda la informacion del input
  const [inputValue, setInputValue] = useState({
    nombre: "",
    unidad: "",
  });

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  //Para agregar un articulo
  const handleAddArticulo = async () => {
    if (inputValue.nombre == "" || inputValue.unidad == "") {
      toast({
        title: "Campos vacíos",
        description: "Hay campos vacíos",
        variant: "destructive",
      });
      return;
    }
    const response = await axios.post(`/api/users/almacen/almacenPage`, {
      Nombre: inputValue.nombre,
      Unidad: inputValue.unidad,
    });
    if (response.status == 200) {
      closeModal();
      toast({
        title: "Artículo agregado",
        description: "El artículo ha sido agregado correctamente",
        variant: "success",
      });
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "No se pudo agregar el artículo",
        variant: "destructive",
      });
    }
  };

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
      <button className=" ml-1 rounded-md p-2 hover:bg-gray-200">
        <Plus
          className="text-acento stroke-[5]"
          size={44}
          onClick={openModal}
        />
      </button>

      {isOpen && (
        <div className="flex items-center justify-center">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <p className="font-bold text-2xl text-center mb-5">
                Agregar Artículo
              </p>

              <div className="flex justify-center flex-col items-center py-3">
                <div className="flex gap-5">
                  <div>
                    <label htmlFor="" className="font-bold text-lg flex-grow">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="border border-black rounded-md w-full py-2 px-2"
                      placeholder="Inserte el nombre del artículo"
                      autoFocus
                      name="nombre"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold text-lg">
                      Unidad:
                    </label>
                    <select
                      name="unidad"
                      onChange={handleChange}
                      className="border border-black py-2 rounded-md"
                      defaultValue={""}
                    >
                      <option value="">Unidad</option>
                      <option value="Kg">Kg</option>
                      <option value="Ml">Ml</option>
                      <option value="Pzas">Pzas</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-5 justify-center">
                  <button
                    onClick={closeModal}
                    className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleAddArticulo()}
                    className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5"
                  >
                    Agregar
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

export default AddArticuloModal;
