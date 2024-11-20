"use client";
import { Pencil, Check, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import FormulaModal from "@/components/ui/Entradas/formulaModal";

interface DashboardProps {
  Rol: number;
  CorralSelected: number;
}

function DashboardCorral({ Rol, CorralSelected }: DashboardProps) {
  //La ruta según el rol
  const ruta =
    Rol == 1
      ? "/users/admin/ganado"
      : Rol == 2
      ? "/users/almacen/ganado"
      : "/users/entradas/corrales";

  const { toast } = useToast();


  //Interface para el corral seleccionado
  interface CorralDataInter {
    Id: number;
    Nombre: string;
    Cantidad: number;
    REEMO: string;
    Motivo: string;
    FECHA: string;
    Dieta: string;
    IdDieta: number;
  }

  //Interface para los animales del corral seleccionado
  interface CorralAnimals {
    Arete: string;
    Sexo: string;
    Clasificacion: string;
    Estado: string;
    Peso: number;
    Corral: string;
  }


  //Guarda la informacion del corral seleccionado
  const [corralData, setCorralData] = useState<CorralDataInter>();

  //Guarda la informacion de los animales del corral seleccionado
  const [corralAnimals, setCorralAnimals] = useState<CorralAnimals[]>([]);

  //Controla cuando se selecciona el corral de cuarentena
  const [isCuartena, setIsCuartena] = useState(false);

  //Controla el estado de editar el nombre de corral
  const [isEditing, setIsEditing] = useState(false);

  //Controla el estado de editar la dieta del corral
  const [isEditingDieta, setIsEditingDieta] = useState(false);

  //El valor del input para buscar
  const [inputValue, setInputValue] = useState({
    search: "",
    nombreCorral: "",
    dieta: "",
  });

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };


  //Cuando se selecciona un corral
  const getCorralData = async () => {
    const response = await axios.get(`/api/users/entradas/corrales/${CorralSelected}`);
    if (CorralSelected == 1) {
      setIsCuartena(true);
      setCorralAnimals(response.data[0]);
    } else {
      inputValue.nombreCorral = response.data[0][0].Nombre;
      inputValue.dieta = response.data[0][0].IdDieta;
      setIsCuartena(false);
      setCorralData(response.data[0][0]);
      setCorralAnimals(response.data[1]);
    }
    console.log(response.data);
  };

  //Cuando el usuario edita el nombre del corral
  const handleEditButton = async () => {
    const dataName = await axios.put(`/api/users/entradas/corrales`, {
      Nombre: inputValue.nombreCorral,
      Id: corralData?.Id,
    });
    if (dataName.status == 200) {
      toast({
        title: "Nombre actualizado",
        description: "El nombre del corral ha sido actualizado",
        variant: "success",
      });
      getCorralData();
      setIsEditing(false);
    } else {
      toast({
        title: "Error",
        description: "Hubo un error al actualizar el nombre del corral",
        variant: "destructive",
      });
    }
  };

  //Cuando el usuario edita la dieta del corral
  const handleEditDieta = async () => {
    if (inputValue.dieta == "") {
      toast({
        title: "Seleccione una dieta",
        description: "Seleccione una dieta para el corral",
        variant: "destructive",
      });
      return;
    }
    const response = await axios.put(
      `/api/users/entradas/corrales/${corralData?.Id}`,
      { Dieta: inputValue.dieta }
    );
    if (response.status == 200) {
      toast({
        title: "Dieta actualizada",
        description: "La dieta del corral ha sido actualizada",
        variant: "success",
      });
      setIsEditingDieta(false);
      if (corralData) {
        getCorralData();
      }
    } else {
      toast({
        title: "Error",
        description: "Hubo un error al actualizar la dieta del corral",
        variant: "destructive",
      });
    }
    inputValue.dieta = "";
  };


  useEffect(() => {
    getCorralData();
  }, []);

  return (
    <div className="w-full h-[90vh] p-10">
        <div className="flex">
          <div className="flex-grow w-full justify-center flex items-center">
            {isCuartena && (
              <p className="font-bold text-3xl mr-2 ml-8">Cuarentena</p>
            )}
            {!isCuartena && (
              <div>
                <div className="flex">
                  {!isEditing && (
                    <p className="font-bold text-3xl mr-2 ml-8">
                      {corralData?.Nombre}
                    </p>
                  )}
                  {isEditing && (
                    <input
                      type="text"
                      defaultValue={corralData?.Nombre}
                      className="text-lg border border-black mr-2 max-h-10 max-w-24 px-2"
                      onChange={handleChange}
                      name="nombreCorral"
                      autoFocus
                    />
                  )}
                  <button
                    className={`${
                      !isEditing
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-acento hover:bg-green-600"
                    } rounded-md p-1 max-h-10`}
                    onClick={
                      !isEditing ? () => setIsEditing(true) : handleEditButton
                    }
                  >
                    {!isEditing ? (
                      <Pencil className="text-white h-7 w-7" />
                    ) : (
                      <Check className="text-white h-7 w-7" />
                    )}
                  </button>
                  <p className="font-bold text-3xl ml-7">
                    Cantidad: {corralData?.Cantidad}
                  </p>
                  <p className="font-bold text-3xl ml-7">
                    REEMO: {corralData?.REEMO}
                  </p>
                  <p className="font-bold text-3xl ml-7">
                    Motivo: {corralData?.Motivo}
                  </p>
                  <p className="font-bold text-3xl ml-7">
                    Fecha: {corralData?.FECHA}
                  </p>
                  {!isEditingDieta ? (
                    <p className="font-bold text-3xl ml-7">
                      Dieta: {corralData?.Dieta ? corralData?.Dieta : "Sin Dieta"}
                    </p>
                  ) : (
                    <select
                      className="ml-7 w-52 border border-black rounded-md max-h-10"
                      defaultValue={`${
                        corralData?.IdDieta ? corralData?.IdDieta : ""
                      }`}
                      onChange={handleChange}
                      name="dieta"
                    >
                      <option value="" disabled>
                        Dieta
                      </option>
                      <option value="1">Abasto</option>
                      <option value="2">Inicio</option>
                      <option value="3">Desarrollo</option>
                      <option value="4">Engorda</option>
                      <option value="5">Finalización</option>
                    </select>
                  )}
                  <button
                    className={`${
                      !isEditingDieta
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-acento hover:bg-green-600"
                    } rounded-md p-1 ml-2 max-h-10`}
                    onClick={
                      !isEditingDieta
                        ? () => setIsEditingDieta(true)
                        : () => handleEditDieta()
                    }
                  >
                    {!isEditingDieta ? (
                      <Pencil className="text-white h-7 w-7" />
                    ) : (
                      <Check className="text-white h-7 w-7" />
                    )}
                  </button>
                </div>
                <div className="flex justify-center py-6">
                {corralData?.Dieta && (
                  <FormulaModal CorralProp={CorralSelected} CantidadAnimalesProp={corralData.Cantidad}/>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      <div
        className={`border-2 border-black h-[80%] overflow-y-auto`}
      >
          <table>
            <thead className="sticky top-0">
              <tr>
                <th>Arete</th>
                {isCuartena && <th>Corral Original</th>}
                <th>Sexo</th>
                <th>Clasificación</th>
                <th>Estado</th>
                <th>Peso</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {corralAnimals.map((animal) => (
                <tr key={animal.Arete}>
                  <td>{animal.Arete}</td>
                  {isCuartena && <td>{animal.Corral}</td>}
                  <td>{animal.Sexo}</td>
                  <td>{animal.Clasificacion}</td>
                  <td>{animal.Estado}</td>
                  <td>{animal.Peso}</td>
                  <td className="flex justify-center">
                    <Link
                      className=" bg-acento hover:bg-green-700 rounded-sm"
                      href={`${ruta}/${CorralSelected}/${animal.Arete}`}
                    >
                      <MoveRight className="text-white m-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default DashboardCorral;
