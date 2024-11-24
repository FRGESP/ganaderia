"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import Select from "react-select";
import axios from "axios";
import { addHistorial } from "@/actions";

//Interfaz de los props
interface AddMedicamentoModalProps {
  AreteProp: string;
}

function AddMedicamentoModal({ AreteProp }: AddMedicamentoModalProps) {
  const { toast } = useToast();

  //Interface para el medicamento faltante
  interface MedicamentoFaltante {
    Articulo: string;
    Faltante: string;
  }

  //Controla el estado del modal
  const [isOpen, setIsOpen] = useState(false);

  //Opciones de los medicamentos
  const [MedicamentosOptions, setMedicamentosOptions] = useState<any[]>([]);

  //Guarda la información de la unidad
  const [unidad, setUnidad] = useState("");

  //Guarda la informacion del input
  const [inputValue, setInputValue] = useState<{
    [key: string]: string | number;
  }>({
    Medicamento: "",
    cantidad: "",
  });

  //Si faltan existencias
  const [faltanExistencias, setFaltanExistencias] = useState(false);

  //Guarda la informacion de las existencias faltantes
  const [existenciasFaltantes, setExistenciasFaltantes] =
    useState<MedicamentoFaltante>();

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: Number(e.target.value),
    });
  };

  const options = async () => {
    const response = await axios.get(
      "/api/entradas/corrales/animales/medicamento"
    );
    console.log(response.data[0]);
    const ItOptions = response.data[0].map((item: any) => {
      return {
        value: item.Id,
        label: item.Articulo,
        name: "Medicamento",
        unidad: item.Unidad,
      };
    });
    setMedicamentosOptions(ItOptions);
  };

  //Controla el cambio del select
  const handleSelectChange = (selectedOption: any) => {
    setInputValue({
      ...inputValue,
      [selectedOption.name]: selectedOption.value,
    });
    setUnidad(selectedOption.unidad);
  };

  const handleAddMedicamento = async () => {
    if (inputValue.Medicamento == "" || inputValue.cantidad == "") {
      toast({
        title: "Campos vacíos",
        description: "Hay campos vacíos",
        variant: "destructive",
      });
      return;
    }
    const response = await addHistorial(
      AreteProp,
      inputValue.Medicamento,
      inputValue.cantidad
    );
    if (!response[0]) {
      toast({
        title: "Medicamento agregado",
        description:
          "El medicamento ha sido agregado correctamente al historial",
        variant: "success",
      });
      closeModal();
      window.location.reload();
    } else {
      toast({
        title: "No hay suficiente inventario",
        description: "No hay suficiente inventario para agregar el medicamento",
        variant: "destructive",
      });
      setFaltanExistencias(true);
      setExistenciasFaltantes(response[0][0]);
    }
  };

  useEffect(() => {
    options();
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
                {faltanExistencias ? 'No hay suficiente inventario' : 'Agregar Medicamento'}
              </p>
              <div className="flex justify-center flex-col items-center py-3">
                {!faltanExistencias ? (
                  <div className="w-full">
                    <div className="w-full">
                      <label
                        htmlFor=""
                        className="font-bold text-lg flex-grow text-left"
                      >
                        Medicamento:
                      </label>
                      <Select
                        options={MedicamentosOptions}
                        className="w-full border border-black rounded-md"
                        onChange={handleSelectChange}
                      />
                    </div>
                    <div className="w-full mt-3">
                      <label
                        htmlFor=""
                        className="font-bold text-lg flex-grow text-left"
                      >
                        Cantidad:
                      </label>
                      <div className="flex justify-center items-center">
                        <input
                          type="number"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Inserte la cantidad que va a aplicar"
                          name="cantidad"
                          onChange={handleChange}
                        />
                        <p className="text-2xl ml-3">{unidad}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                    <table>
                    <thead>
                        <tr>
                            <th>Articulo</th>
                            <th>Faltante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{existenciasFaltantes?.Articulo}</td>
                            <td>{existenciasFaltantes?.Faltante}</td>
                        </tr>
                    </tbody>
                </table>
                )}
                
                <div className="flex gap-5 justify-center">
                  {!faltanExistencias ? (
                    <div className="flex gap-5 justify-center">
                      <button
                        onClick={closeModal}
                        className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleAddMedicamento}
                        className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5"
                      >
                        Aceptar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        closeModal();
                        setFaltanExistencias(false);
                        window.location.reload();
                      }}
                      className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                    >
                      Cerrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMedicamentoModal;
