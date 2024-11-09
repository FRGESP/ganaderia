"use client";

import { useToast } from "@/hooks/use-toast";
import Numpad from "./numpad";
import { useRef, useState } from "react";
import { setReemoAction, isReemoInSession, getReemo } from "@/actions";
import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputValues);
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
    input1: "",
    input2: "",
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

  const getReemoAndSetTrue = async () => {
    //Validar que los campos no esten vacios
    if (
      inputValues.selectMotivo === "" ||
      inputValues.selectCorral === "" ||
      inputValues.selectSexo === "" ||
      inputValues.inputReemo === ""
    ) {
      toast({
        title: "Hubo un error",
        description: "Verifique los datos",
        variant: "destructive",
      });
    } else {
      const session = await getReemo();
      console.log(session);
      setReemo(true);
      setSessionInfoActual(session);
    }
  };

  const handleInputReemo = async () => {
    await setReemoAction(
      inputValues.inputReemo,
      inputValues.selectMotivo,
      inputValues.selectCorral,
      inputValues.selectSexo
    );
    getReemoAndSetTrue();
  };

  useEffect(() => {
    const checkReemoSession = async () => {
      const result = await isReemoInSession();
      result ? getReemoAndSetTrue() : setReemo(false);
    };
    const getcorrales = async () => {
      const corrales = await axios.get(`/api/entradas/corrales`);
      console.log(corrales.data);
      setCorrales(corrales.data);
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
      <div className="w-[65%] border border-black overflow-x-auto">
        <div className={`${reemo === false ? "" : "hidden"}`}>
          <div className="flex justify-center mt-[20%]">
            <div className="border border-black w-[80%] grid grid-cols-1 align-center p-4">
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
                  defaultValue=""
                >
                  <option value="" disabled>
                    Motivo
                  </option>
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
                  defaultValue=""
                >
                  <option value="" disabled>Corral</option>
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
                  defaultValue=""
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
                  className="border border-black bg-acento hover:bg-acentohover w-[70%] p-7 text-xl rounded-full py-4 text-white"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
        <>
          {reemo && (
            <form onSubmit={handlesubmit} ref={form} className="text-xl">
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
                  <label className=" font-bold text-center">
                      Arete:
                    </label>
                  <input
                    type="text"
                    value={inputValues.input1}
                    id="input1"
                    name="input1"
                    readOnly
                    className="border border-black focus:bg-acento p-4 w-[70%] rounded-md flex text-lg"
                    onFocus={() => handleInputFocus("input1")}
                  />
                 <label className=" font-bold text-center">
                      Meses:
                    </label>
                  <input
                    type="text"
                    value={inputValues.input1}
                    id="input1"
                    name="input1"
                    readOnly
                    className="border border-black focus:bg-acento p-4 w-[70%] rounded-md flex text-lg"
                    onFocus={() => handleInputFocus("input1")}
                  />
                  <button className="border border-black p-5">Enviar</button>
                </div>
              </div>
            </form>
          )}
        </>
      </div>
      <div className="w-[35%] flex flex-col">
        <div className="border border-black h-1/3">
          <p>Hola pa</p>
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
