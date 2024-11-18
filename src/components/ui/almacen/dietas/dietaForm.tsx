"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Plus, Check, Edit, Trash } from "lucide-react";
import Select from "react-select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface DietaFormProps {
  idDieta: string;
}

function DietaForm({ idDieta }: DietaFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  interface DietaData {
    Dieta: string;
    Dias: number;
    Total: number;
    Corrales: number;
  }

  interface Corrales {
    Id: number;
    Corral: string;
    Cantidad: number;
    Suma: number;
  }

  interface Formula {
    Id_DA: number;
    Id: number;
    Articulo: string;
    Cantidad: string;
    CantidadNumber: number;
  }

  //Guarda la informacion general de la dieta
  const [dietaData, setDietaData] = useState<DietaData>();

  //Guarda la informacion de los corrales con esa dieta
  const [corrales, setCorrales] = useState<Corrales[]>([]);

  //Guarda la informacion de la formula de la dieta
  const [formula, setFormula] = useState<Formula[]>([]);

  //Es abasto?
  const [isAbasto, setIsAbasto] = useState(false);

  //Está añasdiendo un artículo?
  const [isAddingItem, setIsAddingItem] = useState(false);

  //Está añadiendo un corral?
  const [isAddingCorral, setIsAddingCorral] = useState(false);

  //Opciones de los articulos
  const [ItemsOptions, setItemsOptions] = useState<any[]>([]);

  //Opciones de los corrales
  const [CorralesOptions, setCorralesOptions] = useState<any[]>([]);

  //Si toca poner la cantidad
  const [isCantidad, setIsCantidad] = useState(false);

  //Controla el estado de edicion de cada uno de los inputs de catnidad
  const [editCantidad, setEditCantidad] = useState<{ [key: string]: boolean }>(
    {}
  );

  //Guarda el valor de los inputs fuera de la tabla
  const [inputValue, setInputValue] = useState<{ [key: string]: any }>({
    Articulo: "",
    Cantidad: "",
    Corral: "",
  });

  const Options = async () => {
    const response = await axios.get("/api/users/almacen/dietas");
    const ItOptions = response.data[0].map((item: any) => {
      return { value: item.Id, label: item.Articulo, name: "Articulo" };
    });
    setItemsOptions(ItOptions);
    const CorOptions = response.data[1].map((corral: any) => {
      return { value: corral.Id, label: corral.Corral, name: "Corral" };
    });
    setCorralesOptions(CorOptions);
  };

  const getDietadata = async () => {
    const response = await axios.get(`/api/users/almacen/dietas/${idDieta}`);
    setDietaData(response.data[0][0]);
    setCorrales(response.data[1]);
    setFormula(response.data[2]);
    response.data[2].map((item: any) => {
      setInputValue((prev) => ({
        ...prev,
        [item.Id_DA]: item.CantidadNumber,
      }));
    });
    if (response.data[0][0].Dieta == "Abasto") {
      setIsAbasto(true);
    }
  };

  //Controla el cambio de estado para editar una cantidad
  const handleEditCantidad = async (idArt: number) => {
    if (editCantidad[idArt]) {
      const response = await axios.put(`/api/users/almacen/dietas/`, {
        Id: idArt,
        Cantidad: inputValue[idArt],
      });
      if (response.status == 200) {
        toast({
          title: "Cantidad actualizada",
          description: "La cantidad ha sido actualizada correctamente",
          variant: "success",
        });
        getDietadata();
      } else {
        toast({
          title: "Error",
          description: "Hubo un error al actualizar la cantidad",
          variant: "destructive",
        });
      }
    }
    setEditCantidad({
      ...editCantidad,
      [idArt]: !editCantidad[idArt],
    });
  };

  //Controla cuando se quiere añadir un corrral
  const handleCorralSubmit = async () => {
    if (inputValue.Corral == "") {
      toast({
        title: "Error",
        description: "Corral no válido",
        variant: "destructive",
      });
      return;
    }
    const res = await axios.post("/api/users/almacen/dietas", {
      Metodo: 2,
      IdDieta: idDieta,
      Corral: inputValue.Corral,
    });
    if (res.status == 200) {
      toast({
        title: "Corral añadido",
        description: "El corral ha sido añadido correctamente a la dieta",
        variant: "success",
      });
      getDietadata();
      Options();
      setIsAddingCorral(false);
    }
  };

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  //Controla el cambio del select
  const handleSelectChange = (selectedOption: any) => {
    setInputValue({
      ...inputValue,
      [selectedOption.name]: selectedOption.value,
    });
  };

  //Controla el subit de un articulo
  const handleArticuloSubmit = async () => {
    if (inputValue.Articulo == "") {
      toast({
        title: "Error",
        description: "Artículo no válido",
        variant: "destructive",
      });
      return;
    }
    setIsCantidad(true);
  };

  //Controla el submit de la cantidad de un articulo
  const handleCantidadSubmit = async () => {
    if (inputValue.Cantidad == "" || inputValue.Cantidad < 1) {
      toast({
        title: "Error",
        description: "Cantidad no válida",
        variant: "destructive",
      });
      return;
    }
    const res = await axios.post("/api/users/almacen/dietas", {
      Metodo: 1,
      IdDieta: idDieta,
      IdArticulo: inputValue.Articulo,
      Cantidad: inputValue.Cantidad,
    });

    if (res.status == 200) {
      toast({
        title: "Artículo añadido",
        description: "El artículo ha sido añadido correctamente a la dieta",
        variant: "success",
      });
      setIsCantidad(false);
      setIsAddingItem(false);
      getDietadata();
    }
  };

  const handleDeleteArticulo = async (idArt: number) => {
    if (confirm("¿Está seguro de eliminar este artículo?")) {
      const res = await axios.delete(`/api/users/almacen/dietas/${idArt}`);
      if (res.status == 200) {
        toast({
          title: "Artículo Eliminado",
          description:
            "El artículo ha sido eliminado correctamente de la dieta",
          variant: "success",
        });
        getDietadata();
      }
    }
  };

  const handleDeleteCorral = async (idCorral: number) => {
    if (confirm("¿Está seguro de eliminar este corral?")) {
      const res = await axios.put(`/api/users/almacen/dietas/corrales`, {
        Corral: idCorral,
      });
      if (res.status == 200) {
        toast({
          title: "Corral Eliminado",
          description: "El corral ha sido eliminado correctamente de la dieta",
          variant: "success",
        });
        getDietadata();
        Options();
      }
    }
  };

  useEffect(() => {
    getDietadata();
    Options();
  }, []);

  return (
    <div className=" h-[90vh] w-full p-10">
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <div className="flex">
          <p className="font-bold text-5xl ml-10">{`${dietaData?.Dieta} ${
            dietaData?.Dias ? `a ${dietaData?.Dias} días` : ""
          }`}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-5">
          <div>
            <p className="font-bold text-3xl mt-5 text-center">Fórmula</p>
            <div className="flex w-full mb-3">
              <p className="font-bold text-3xl mt-5 flex-grow">
                Total: {dietaData?.Total} Kg
              </p>
              {!isAddingItem && (
                <button
                  className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg"
                  onClick={() => setIsAddingItem(true)}
                >
                  <Plus size={48} />
                </button>
              )}
              {isAddingItem && !isCantidad ? (
                <div className="flex justify-center items-center">
                  <Select
                    options={ItemsOptions}
                    className="w-72"
                    onChange={handleSelectChange}
                  />
                  <button
                    className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg"
                    onClick={() => {
                      handleArticuloSubmit();
                    }}
                  >
                    <Check size={48} />
                  </button>
                </div>
              ) : (
                ""
              )}
              {isCantidad ? (
                <div className="flex justify-center items-center">
                  <input
                    type="number"
                    autoFocus
                    className="border border-black w-72 rounded-md h-11 px-3"
                    name="Cantidad"
                    placeholder="Cantidad del artículo"
                    onChange={handleChange}
                  />
                  <button
                    className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg"
                    onClick={() => {
                      handleCantidadSubmit();
                    }}
                  >
                    <Check size={48} />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Artículo</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {formula.map((item) => (
                  <tr key={item.Id_DA} className="hover:bg-[#f8f8f8]">
                    <td>{item.Articulo}</td>
                    <td className="w-64">
                      {editCantidad[item.Id_DA] ? (
                        <div className="">
                          <input
                            type="number"
                            className="border border-black px-2 h-8 rounded-md"
                            defaultValue={item.CantidadNumber}
                            name={`${item.Id_DA}`}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        item.Cantidad
                      )}
                    </td>
                    <td className="w-36">
                      {editCantidad[item.Id_DA] ? (
                        <div className="flex justify-center items-center">
                          <button
                            className="border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md bg-acento hover:bg-acentohover"
                            onClick={() => {
                              handleEditCantidad(item.Id_DA);
                            }}
                          >
                            <Check className="text-white size-7" />
                          </button>
                        </div>
                      ) : (
                        <div className="grid gap-1 grid-cols-2 text-black">
                          <button
                            className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
                            onClick={() => handleEditCantidad(item.Id_DA)}
                          >
                            <Edit className="text-yellow-600 size-7" />
                          </button>
                          <button
                            className="border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
                            onClick={() => handleDeleteArticulo(item.Id_DA)}
                          >
                            <Trash className="text-red-600 size-7" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-bold text-3xl mt-5 text-center">Corrales</p>
            <div className="flex w-full mb-3">
              <p className="font-bold text-3xl mt-5 flex-grow">
                Total: {dietaData?.Corrales} Corrales
              </p>
              {isAbasto || dietaData?.Dieta == "Inicio" ? (
                !isAddingCorral ? (
                  <button
                    className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg"
                    onClick={() => setIsAddingCorral(true)}
                  >
                    <Plus size={48} />
                  </button>
                ) : (
                  <div className="flex justify-center items-center">
                    <Select
                      options={CorralesOptions}
                      className="w-72"
                      onChange={handleSelectChange}
                    />
                    <button
                      className="bg-acento hover:bg-acentohover text-white h-10 w-10 m-2 flex justify-center items-center rounded-lg"
                      onClick={() => {
                        handleCorralSubmit();
                      }}
                    >
                      <Check size={48} />
                    </button>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            {corrales.length == 0 ? (
              <div className=" w-full h-[calc(100%-7.7rem)] flex justify-center items-center border border-black rounded-md">
                <p className="font-bold text-3xl mt-5">
                  Sin corrales asignados
                </p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Corral</th>
                    <th>Cantidad Animales</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {corrales.map((corral) => (
                    <tr key={corral.Corral}>
                      <td>{corral.Corral}</td>
                      <td>{corral.Cantidad}</td>
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
                            onClick={() => handleDeleteCorral(corral.Id)}
                          >
                            <Trash className="text-red-600 size-7" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietaForm;
