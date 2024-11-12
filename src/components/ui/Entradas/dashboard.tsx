"use client";

import { useToast } from "@/hooks/use-toast";
import Numpad from "./numpad";
import { useRef, useState } from "react";
import {
  setReemoAction,
  isReemoInSession,
  getReemo,
  addAnimal,
  getAnimalsList,
  deleteReemo,
} from "@/actions";
import { useEffect } from "react";
import axios from "axios";


function Dashboard() {
  const { toast } = useToast();


  const handlesubmit = async (e: any) => {
    e.preventDefault();
    if (
      inputValues.areteInput === "" ||
      inputValues.mesesInput === "" ||
      inputValues.pesoInput === "" ||
      inputValues.selectEstado === ""
    ) {
      toast({
        title: "Ingrese Todos los datos",
        description: "Hay campos vacios",
        variant: "destructive",
      });
    } else {
      const response = await addAnimal(inputValues);
      if (response.RES === 1) {
        toast({
          title: "Animal agregado",
          description: "El animal ha sido agregado correctamente",
          variant: "success",
        });
        inputValues.areteInput = "";
        inputValues.mesesInput = "";
        inputValues.pesoInput = "";
        inputValues.selectEstado = "";

        await getlist();
      } else {
        toast({
          title: "Arete ya registrado",
          description: "El arete ya ha sido registrado, verifique los datos",
          variant: "destructive",
        });
      }
    }
  };

  const terminarGuia = async () => {
    await deleteReemo();
    setReemo(false);
    setAnimales([]);
    getcorrales();
    toast({
      title: "Guia REEMO registrada",
      description: "Se ha registrado la guia REEMO correctamente",
      variant: "success",
    });
  };

  //Interfaz para los corrales obtenidos de la base de datos
  interface corral {
    IdCorral: number;
    Corral: string;
  }

  //Interfaz para los datos guardados en la session
  interface sessionInfo {
    reemo: string | undefined;
    motivo: string | undefined;
    corral: string | undefined;
    sexo: string | undefined;
    motivoChar: string | undefined;
    corralChar: string | undefined;
  }

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    areteInput: "",
    mesesInput: "",
    pesoInput: "",
    selectEstado: "",
    inputReemo: "",
    selectMotivo: "",
    selectCorral: "",
    selectSexo: "",
  });

  //Ver que input esta activo
  const [activeInput, setActiveInput] = useState<string | null>(null);

  //Verificar si reemo ya fue registrado
  const [reemo, setReemo] = useState<null | boolean>(null);

  //Verificar el reemo actual y almacenarlo
  const [infoActual, setSessionInfoActual] = useState<sessionInfo>();

  //Guardar el objeto de corrales
  const [corralesClient, setCorrales] = useState<corral[]>([]);

  //Garda la lista de los animales ingresados
  const [animales, setAnimales] = useState<any[]>([]);

  const getReemoAndSetTrue = async (recarga: boolean) => {
    //Validar que los campos no esten vacios
    if (
      (inputValues.selectMotivo === "" ||
        inputValues.selectCorral === "" ||
        inputValues.selectSexo === "" ||
        inputValues.inputReemo === "") &&
      !recarga //No aplica cuando es recarga de página
    ) {
      toast({
        title: "Campos vacios",
        description: "Por favor llene todos los campos",
        variant: "destructive",
      });
    } else {
      const session = await getReemo();
      setReemo(true);
      setSessionInfoActual(session);
      setInputValues({
        ...inputValues,
        inputReemo: "",
        selectMotivo: "",
        selectCorral: "",
        selectSexo: "",
      });
      await getlist();
    }
  };

  const handleInputReemo = async () => {
    const res = await setReemoAction(
      inputValues.inputReemo,
      inputValues.selectMotivo,
      inputValues.selectCorral,
      inputValues.selectSexo
    );
    if(res === true){
      getReemoAndSetTrue(false);
    } else {
      toast({
        title: "REEMO ya registrado",
        description: "Este REEMO ya ha sido registrado",
        variant: "destructive",
      });
    }
    
  };

  //Obtiene la lista de los animales y los guarda para mostrar
  const getlist = async () => {
    const animalesGET = await getAnimalsList();
    setAnimales(animalesGET);
  };

  const getcorrales = async () => {
    const corrales = await axios.get(`/api/entradas/corrales`);
    setCorrales(corrales.data);
  };

  useEffect(() => {
    const checkReemoSession = async () => {
      const result = await isReemoInSession();
      result ? getReemoAndSetTrue(true) : setReemo(false);
    };

    getcorrales();
    checkReemoSession();
  }, []);

  const handleInputFocus = (input: string) => {
    setActiveInput(input);
  };

  const handleInputChange = (newValue: string) => {
    if (activeInput) {
      setInputValues({
        ...inputValues,
        [activeInput]: newValue,
      });
    }
  };

  //Manejar el cambio de los select y actualiza su valor
  const handleSelectChange = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-[90vh]">
      <div className="w-[55%] border border-black overflow-x-auto">
        <div className={`${reemo === false ? "" : "hidden"}`}>
          <div className="flex justify-center mt-[20%]">
            <div className="border-2 border-black w-[80%] grid grid-cols-1 align-center p-4 shadow-lg">
              <label className="text-lg font-bold text-center">
                Inserte la guia REEMO
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={inputValues.inputReemo}
                  id="inputReemo"
                  name="inputReemo"
                  readOnly
                  className="border border-black focus:bg-acento p-4 w-[70%] rounded-md my-6 text-lg"
                  onFocus={() => handleInputFocus("inputReemo")}
                />
              </div>
              <div className="flex grid-cols-6 justify-center gap-3">
                <label className="font-bold flex justify-end items-center h-full">
                  Motivo:
                </label>
                <select
                  name="selectMotivo"
                  id="selectMotivo"
                  className="border border-black py-4 text-xl rounded-xl"
                  onChange={handleSelectChange}
                  value={inputValues.selectMotivo}
                >
                  <option value="" disabled>Motivo</option>
                  <option value="1">Cria</option>
                  <option value="2">Engorda</option>
                  <option value="3">Sacrificio</option>
                </select>
                <label className=" font-bold flex justify-end items-center h-full">
                  Corral:
                </label>
                <select
                  name="selectCorral"
                  id="selectCorral"
                  className="border border-black py-4 text-xl rounded-xl text-black px-7"
                  onChange={handleSelectChange}
                  value={inputValues.selectCorral}
                >
                  <option value="" disabled>
                    Corral
                  </option>
                  {corralesClient.map((corral) => (
                    <option
                      key={corral.IdCorral}
                      value={corral.IdCorral}
                      className="text-black"
                    >
                      {corral.Corral}
                    </option>
                  ))}
                </select>
                <label className=" font-bold flex justify-end items-center h-full">
                  Sexo:
                </label>
                <select
                  name="selectSexo"
                  id="selectSexo"
                  className="border border-black py-4 text-xl rounded-xl text-black"
                  onChange={handleSelectChange}
                  value={inputValues.selectSexo}
                >
                  <option value="" disabled>
                    Sexo
                  </option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleInputReemo()}
                  className=" bg-acento hover:bg-acentohover w-[70%] p-7 text-xl rounded-full py-4 text-white"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
        <>
          {reemo && (
            <div className="text-xl">
              <div className="flex justify-center mt-5 h-full items-center flex-col">
                <div className="mb-6">
                  <label className=" font-bold text-center text-3xl">
                    REEMO: {`${infoActual?.reemo}`}
                  </label>
                </div>
                <div className="flex justify-center gap-5 text-2xl">
                  <label className="font-bold  items-center h-full">
                    Motivo: {`${infoActual?.motivoChar}`}
                  </label>
                  <label className=" font-bold flex items-center h-full">
                    Corral: {`${infoActual?.corralChar}`}
                  </label>
                  <label className=" font-bold flex  items-center h-full">
                    Sexo: {`${infoActual?.sexo}`}
                  </label>
                </div>
              </div>
              <div className="mt-10 border-black mx-20 p-4 border-2">
                <h2 className="text-xl font-bold text-black flex justify-center mb-5">
                  Datos del Animal
                </h2>
                <div className="flex flex-col gap-y-2 items-center">
                  <label className=" font-bold text-center">Arete:</label>
                  <input
                    type="text"
                    value={inputValues.areteInput}
                    id="areteInput"
                    name="areteInput"
                    readOnly
                    className="border border-black focus:bg-acento p-4 w-[70%] rounded-md flex text-lg"
                    onFocus={() => handleInputFocus("areteInput")}
                  />
                  <label className=" font-bold text-center">Meses:</label>
                  <input
                    type="text"
                    value={inputValues.mesesInput}
                    id="mesesInput"
                    name="mesesInput"
                    readOnly
                    className="border border-black focus:bg-acento p-4 w-[70%] rounded-md flex text-lg"
                    onFocus={() => handleInputFocus("mesesInput")}
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col ">
                      <label className=" font-bold text-center ">Peso:</label>
                      <input
                        type="text"
                        value={inputValues.pesoInput}
                        id="pesoInput"
                        name="pesoInput"
                        readOnly
                        className="border border-black focus:bg-acento p-4 rounded-md flex text-lg"
                        onFocus={() => handleInputFocus("pesoInput")}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className=" font-bold text-center">Estado:</label>
                      <select
                        name="selectEstado"
                        id="selectEstado"
                        className="border border-black py-4 text-xl rounded-xl text-black"
                        onChange={handleSelectChange}
                        value={inputValues.selectEstado}
                      >
                        <option value="" disabled>
                          Estado
                        </option>
                        <option value="1">Saludable</option>
                        <option value="2">Enfermo</option>
                        <option value="3">Muerto</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="border border-black bg-acento hover:bg-acentohover w-[70%] p-7 text-xl rounded-full py-4 text-white mt-4"
                    onClick={handlesubmit}
                  >
                    Enviar
                  </button>
                  <button
                    className="border border-black bg-blue-500 hover:bg-blue-700 w-[70%] p-7 text-xl rounded-full py-4 text-white mt-4"
                    onClick={() => terminarGuia()}
                  >
                    Terminar Guia
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
      <div className="w-[45%] flex flex-col">
        <div className="border border-black h-1/3 max-h-[1/3]">
          <div className="h-full overflow-y-auto">
            <table>
              <thead>
                <tr className="sticky top-0">
                  <th>Arete</th>
                  <th>Sexo</th>
                  <th>Meses</th>
                  <th>Clasificación</th>
                  <th>Peso</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {animales.map((animal) => (
                  <tr key={animal.Arete}>
                    <td>{animal.Arete}</td>
                    <td>{animal.Sexo}</td>
                    <td>{animal.Meses}</td>
                    <td>{animal.Clasificacion}</td>
                    <td>{animal.Peso}</td>
                    <td>{animal.Estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border border-black flex-grow">
          <Numpad
            inputValue={activeInput ? inputValues[activeInput] : ""}
            onchange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
