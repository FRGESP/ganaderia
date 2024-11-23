"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { addLote } from "@/actions";

//Interfaz de los props
interface AddLoteModalProps {
    ArticuloId: number;
}

function AddLoteModal({ ArticuloId }: AddLoteModalProps) {
  const { toast } = useToast();

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

    //Guarda la informacion del input
    const [inputValue, setInputValue] = useState({
        cantidad: "",
        precio: "",
    });

    //Controla el cambio del input
    const handleChange = (e: any) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    //Para agregar un lote
    const handleAddLote = async () => {
        if (inputValue.cantidad == "" || inputValue.precio == "") {
            toast({
                title: "Campos vacíos",
                description: "Hay campos vacíos",
                variant: "destructive",
            });
            return;
        }
        const response = await addLote(ArticuloId, inputValue.cantidad, inputValue.precio);
        if (response == 200) {
            closeModal();
            toast({
                title: "Lote agregado",
                description: "El lote ha sido agregado correctamente",
                variant: "success",
            });
            window.location.reload();
        } else {
            toast({
                title: "Error",
                description: "No se pudo agregar el lote",
                variant: "destructive",
            });
        }
    }

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
                Agregar Lote
              </p>
              <div className="flex justify-center flex-col items-center py-3">
                <div className="w-full">
                    <label
                      htmlFor=""
                      className="font-bold text-lg flex-grow text-left"
                    >
                      Cantidad:
                    </label>
                    <input
                      type="number"
                      className="border border-black rounded-md w-full py-2 px-2"
                      placeholder="Inserte la cantidad"
                      autoFocus
                      name="cantidad"
                      onChange={handleChange}
                    />
                </div>
                <div className="w-full mt-3">
                    <label
                      htmlFor=""
                      className="font-bold text-lg flex-grow text-left"
                    >
                      Precio:
                    </label>
                    <input
                      type="number"
                      className="border border-black rounded-md w-full py-2 px-2"
                      placeholder="Inserte el precio total de compra"
                      name="precio"
                      onChange={handleChange}
                    />
                </div>
                <div className="flex gap-5 justify-center">
                  <button
                    onClick={closeModal}
                    className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddLote}
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

export default AddLoteModal;
