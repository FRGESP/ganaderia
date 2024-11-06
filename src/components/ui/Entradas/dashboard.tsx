"use client";

import { useToast } from "@/hooks/use-toast";
import Numpad from "./numpad";
import { useRef, useState } from "react";
import { setReemoAction, isReemoInSession } from "@/actions";
import { useEffect } from "react";

function Dashboard() {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputValues);
  };

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    input1: "",
    input2: "",
    inputReemo: "",
  });

  const [activeInput, setActiveInput] = useState<string | null>(null);

  const [reemo, setReemo] = useState<null | boolean>(null);

  const handleInputReemo = async () => {
    await setReemoAction(inputValues.inputReemo);
    setReemo(true);
  };

  useEffect(() => {
    const checkReemoSession = async () => {
      const result = await isReemoInSession();
      result ? setReemo(true) : setReemo(false);
    };
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
  return (
    <div className="flex h-[90vh]">
      <div className="w-[65%] border border-black">
        <div className={`${reemo === false ? "" : "hidden"}`}>
          <div className="flex justify-center mt-[20%]">
            <div className="border border-black w-[40%] grid grid-cols-1 align-center p-4">
              <label className="text-lg font-bold text-center">
                Inserte la guia REEMO
              </label>
              <input
                type="text"
                value={inputValues.inputReemo}
                id="inputReemo"
                name="inputReemo"
                readOnly
                className="border border-black focus:bg-acento p-4 w-full rounded-md my-6 text-lg"
                onFocus={() => handleInputFocus("inputReemo")}
              />
              <button
                onClick={() => handleInputReemo()}
                className="border border-black bg-acento hover:bg-acentohover w-full p-7 text-xl rounded-full py-4 text-white"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
        <>
          {reemo && (
            <form onSubmit={handlesubmit} ref={form}>
              <input
                type="text"
                value={inputValues.input1}
                id="input1"
                name="input1"
                readOnly
                className="border border-black focus:bg-acento"
                onFocus={() => handleInputFocus("input1")}
              />
              <input
                type="text"
                value={inputValues.input2}
                id="input2"
                name="input2"
                readOnly
                className="border border-black focus:bg-acento"
                onFocus={() => handleInputFocus("input2")}
              />
              <button className="border border-black p-5">Enviar</button>
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
