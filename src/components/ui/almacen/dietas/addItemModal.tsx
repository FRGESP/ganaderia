import { useState } from "react";
import { Plus } from "lucide-react";

function AddItemModal() {
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
      <button className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg" onClick={openModal}>
        <Plus size={48} />
      </button>

      {isOpen && (
        <div className="flex items-center justify-center">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">Agregar Artículo</h2>
                    <p>Hola</p>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
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

export default AddItemModal;
