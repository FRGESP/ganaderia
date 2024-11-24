"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";
import axios from "axios";
import { set } from "zod";


function SettingsModal() {
  const { toast } = useToast();

  //Interface para el la configuracion
    interface Configuracion {
        Id: number;
        Configuracion: string;
        Parametro: number;
    }

    //Guarda la información de la configuracion
    const [configuracion, setConfiguracion] = useState<Configuracion>();

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

    //Guarda la informacion del input
    const [inputValue, setInputValue] = useState({
        ganancia: 0,
    });

    //Controla el cambio del input
    const handleChange = (e: any) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: Number(e.target.value),
        });
    };

    //Funcion para obtener la configuracion
    const getConfiguracion = async () => {
        const response = await axios.get(`/api/users/admin/ventas/configuracion`);
         setConfiguracion(response.data[0]);
         inputValue.ganancia = response.data[0].Parametro;
    }

    //Funcion para editar la configuracion
    const handleEditSettings = async () => {
        if(inputValue.ganancia < 0 || inputValue.ganancia > 100){
            toast({
                title: "Error",
                description: "El porcentaje de ganancia debe estar entre 0 y 100",
                variant: "destructive",
            });
            return;
        }
        const response = await axios.put(`/api/users/admin/ventas/configuracion`, {Ganancia: inputValue.ganancia});
        if(response.status == 200){
            toast({
                title: "Configuración actualizada",
                description: "La configuración ha sido actualizada correctamente",
                variant: "success",
            });
            window.location.reload();
        } else{
            toast({
                title: "Error",
                description: "No se pudo actualizar la configuración",
                variant: "destructive",
            });
        }
        closeModal();
    }

    useEffect(() => {
        getConfiguracion();
    }, []);

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
      <button className='hover:bg-[#ececec] absolute top-8 right-8 rounded-md' onClick={openModal}>
            <Settings size={70} />
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
                      Porcentaje de ganancia actual:
                    </label>
                    <input
                      type="number"
                      className="border border-black rounded-md w-full py-2 px-2"
                      placeholder="Ingrese la ganancia en porcentaje"
                      autoFocus
                      name="ganancia"
                      defaultValue={configuracion?.Parametro}
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
                    onClick={handleEditSettings}
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

export default SettingsModal;
