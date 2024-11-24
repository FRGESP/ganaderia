"use client";

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddMedicamentoModal from "@/components/ui/Entradas/addMedicamento";

interface AnimalDashboardProps {
  AreteAnimal: string;
  Admin: boolean;
  Rol: number;
}

function AnimalDashboard({ AreteAnimal, Admin, Rol }: AnimalDashboardProps) {
  const ruta =
    Rol == 1
      ? "/users/admin/ganado"
      : Rol == 2
      ? "/users/almacen/ganado"
      : "/users/entradas/corrales";

  const { toast } = useToast();

  const router = useRouter();

  //Interface para el animal
  interface Animal {
    Arete: string;
    REEMO: string;
    Sexo: string;
    Meses: number;
    Clasificacion: string;
    Estado: string;
    EstadoId: number;
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

  //Interface para los medicamentos
  interface Medicamentos {
    Id: number;
    Medicamento: string;
    Cantidad: string;
    Empleado: string;
    Gasto: number;
    Fecha: string;
  }

  //Guarda la información del animal
  const [animal, setAnimal] = useState<Animal>();

  //Guarda la información de la alimentación
  const [alimentacion, setAlimentacion] = useState<Alimentacion[]>([]);

  //Guarda la información de los medicamentos
  const [medicamentos, setMedicamentos] = useState<Medicamentos[]>([]);

  //Controla el estado de edición
  const [isEditing, setIsEditing] = useState(false);

  //Guarda la informacion de los inputs
  const [inputValues, setInputValues] = useState({
    Meses: "",
    Estado: "",
    Peso: "",
  });

  //Controla el cambio de los inputs
  const handleChange = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  //Obtiene la información del animal
  const getAnimal = async () => {
    const response = await axios.get(
      `/api/entradas/corrales/animales/${AreteAnimal}`
    );
    console.log(response.data);
    if (response.data[0].length > 0) {
      setAnimal(response.data[0][0]);
      inputValues.Meses = response.data[0][0].Meses;
      inputValues.Estado = response.data[0][0].EstadoId;
      inputValues.Peso = response.data[0][0].Peso;
      console.log(response.data[1]);
      setAlimentacion(response.data[1]);
      setMedicamentos(response.data[2]);
    }
  };

  const handleEditAnimal = async () => {
    if (confirm(`Se actualizarán los datos del animal ${AreteAnimal}`)) {
      const response = await axios.put(
        `/api/entradas/corrales/animales/${AreteAnimal}`,
        {
          Meses: inputValues.Meses,
          Estado: inputValues.Estado,
          Sexo: animal?.Sexo,
          Peso: inputValues.Peso,
        }
      );
      if (response.status == 200) {
        toast({
          title: "Animal actualizado",
          description: "El animal ha sido actualizado",
          variant: "success",
        });
        router.push(ruta);
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Ha ocurrido un error",
          variant: "destructive",
        });
      }
    }
    getAnimal();
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
              {animal?.Precio && Admin ? <th>Precio Sugerido</th> : ""}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{animal?.Arete}</td>
              <td>{animal?.REEMO}</td>
              <td>{animal?.Sexo}</td>
              <td>
                {!isEditing ? (
                  animal?.Meses
                ) : (
                  <input
                    type="number"
                    name="Meses"
                    className="border border-black rounded-md py-1 w-20 px-2"
                    onChange={handleChange}
                    defaultValue={animal?.Meses}
                  />
                )}
              </td>
              <td>{animal?.Clasificacion}</td>
              <td>
                {!isEditing ? (
                  animal?.Estado
                ) : (
                  <select
                    className="border border-black rounded-md py-1"
                    defaultValue={animal?.EstadoId}
                    onChange={handleChange}
                    name="Estado"
                  >
                    <option value="1">Saludable</option>
                    <option value="2">Enfermo</option>
                    <option value="3">Muerto</option>
                  </select>
                )}
              </td>
              <td>{animal?.Corral}</td>
              <td>{animal?.Fecha}</td>
              <td>
                {!isEditing ? (
                  `${animal?.Peso} Kg`
                ) : (
                  <input
                    type="number"
                    name="Peso"
                    className="border border-black rounded-md py-1 w-20 px-2"
                    onChange={handleChange}
                    defaultValue={animal?.Peso}
                  />
                )}
              </td>
              {Admin && (
                <td>
                  {!animal?.Precio ? "Sin registro" : `$${animal?.Precio}`}
                </td>
              )}
              {animal?.Precio && Admin ? <td>${animal.PrecioSugerido}</td> : ""}
              <td>
                <div className="flex justify-center items-center">
                  <button
                    className={`${
                      !isEditing
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-acento hover:bg-green-600"
                    } rounded-md p-1 max-h-10`}
                    onClick={() => {
                      setIsEditing(!isEditing);
                      isEditing ? handleEditAnimal() : "";
                    }}
                  >
                    {!isEditing ? (
                      <Pencil className="text-white h-7 w-7" />
                    ) : (
                      <Check className="text-white h-7 w-7" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full grid grid-cols-2 gap-5 mt-5">
        <div>
          <p className="font-bold text-3xl mt-5 text-center mb-5">
            Alimentación
          </p>
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
          ) : (
            <div className="min-h-20 w-full h-[calc(100%-4.7rem)] flex justify-center items-center border border-black rounded-md">
              <p className="font-bold text-3xl mt-5">Sin datos aún</p>
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-center items-center">
            <p className="font-bold text-3xl mt-5 text-center mb-5">
              Medicamento
            </p>
            <AddMedicamentoModal AreteProp={AreteAnimal} />
          </div>
          {medicamentos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Historial</th>
                  <th>Medicamento</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  {Admin && <th>Empleado</th>}
                  {Admin && <th>Gasto</th>}
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((medicamento) => (
                  <tr key={medicamento.Id}>
                    <td>{medicamento.Id}</td>
                    <td>{medicamento.Medicamento}</td>
                    <td>{medicamento.Cantidad}</td>
                    <td>{medicamento.Fecha}</td>
                    {Admin && <td>{medicamento.Empleado}</td>}
                    {Admin && <td>${medicamento.Gasto}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="min-h-20 w-full h-[calc(100%-4.7rem)] flex justify-center items-center border border-black rounded-md">
              <p className="font-bold text-3xl mt-5">Sin datos aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalDashboard;
