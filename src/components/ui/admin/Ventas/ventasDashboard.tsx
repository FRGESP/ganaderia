"use client";

import SettingsModal from "@/components/ui/admin/Ventas/settingsModal";
import { useEffect, useState } from "react";
import React from "react";
import Select from "react-select";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { PDFExport } from "@progress/kendo-react-pdf";

function VentasDashboard() {
  const pdfExportComponent = React.useRef<PDFExport>(null);

  const exportPDF = () => {
    pdfExportComponent.current?.save();
  };

  const { toast } = useToast();

  //Interface de los animales
  interface Animales {
    Arete: string;
    Sexo: string;
    Meses: number;
    Clasificacion: string;
    Corral: string;
    Peso: number;
    PrecioCompra: number;
    PrecioSugerido: number;
  }

  //Interfae de la información del corral seleccionado
  interface CorralInfo {
    Inversion: number;
    Precio: number;
    Ganancia: number;
    REEMO: string;
    PrecioNumber: number;
    IdMotivo: number;
    Motivo: string;
  }

  //Interface para el corral seleccionado
  interface Corral {
    Id: string;
    Corral: string;
  }

  //Opciones de los corrales para venta
  const [CorralesOptions, setCorralesOptions] = useState<any[]>([]);

  //Guarda el valor de los inputs
  const [inputValue, setInputValue] = useState({
    Corral: "",
    precioFinal: 0,
    psg: "",
    nombre: "",
    razonSocial: "",
    municipio: "",
    localidad: "",
    estado: "",
  });

  //Guarda el valor del corral seleccionado
  const [corralSelected, setCorralSelected] = useState<Corral>();

  //Si está seleccionado un corral
  const [isSelected, setisSelected] = useState(false);

  //Guarda la informacón de los animales del corral seleccionado
  const [AnimalesCorral, setAnimalesCorral] = useState<Animales[]>([]);

  //Guarda la información del corral seleccionado
  const [CorralInfo, setCorralInfo] = useState<CorralInfo>();

  //Estado si está imprimiento
  const [isNotPrinting, setIsNotPrinting] = useState(true);

  //Guarda la informacion del último id de la venta
  const [lastId, setLastId] = useState(0);

  //Establece el estado si el motivo es sacrificio
  const [isSacrificio, setIsSacrificio] = useState(false);

  //Guarda la información del precio de cada animal
  const [inputPrecios, setInputPrecios] = useState<{ [key: string]: number }>(
    {}
  );

  //Calcula el total de la venta cuando es sacrificio
  const totalSacrificio = () => {
    let total = 0;
    for (let i = 0; i < AnimalesCorral.length; i++) {
      total += inputPrecios[AnimalesCorral[i].Arete];
    }
    inputValue.precioFinal = total;
  };

  //Controla el cambio del precio de cada animal
  const handlePrecioChange = (e: any) => {
    setInputPrecios({
      ...inputPrecios,
      [e.target.name]: Number(e.target.value),
    });
  };

  //Calcula el total de la venta cuando es sacrificio
  useEffect(() => {
    if (isSacrificio) {
      totalSacrificio();
    }
  }, [inputPrecios]);

  const corralesOptions = async () => {
    const response = await axios.get("/api/users/admin/ventas/corrales");
    if (response.data[0][0] != null) {
      const ItOptions = response.data[0].map((item: any) => {
        return {
          value: item.Id,
          label: item.Corral,
          name: "Corral",
        };
      });
      setCorralesOptions(ItOptions);
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
    const corral = { Id: selectedOption.value, Corral: selectedOption.label };
    setCorralSelected(corral);
  };

  // Obtiene la información del corral seleccionado
  const getCorralVenta = async () => {
    const response = await axios.post("/api/users/admin/ventas/corrales", {
      Corral: corralSelected?.Id,
    });
    if (response.data[0][0].IdMotivo == 3) {
      setIsSacrificio(true);
      response.data[1].map((animal: any) => {
        inputPrecios[animal.Arete] = Number(animal.PrecioSugerido);
      });
    }
    setAnimalesCorral(response.data[1]);
    setCorralInfo(response.data[0][0]);
    inputValue.precioFinal = response.data[0][0].PrecioNumber;
  };

  //Controla la venta del corral
  const handleVenta = async () => {
    if (
      inputValue.precioFinal == 0 ||
      inputValue.psg == "" ||
      inputValue.nombre == "" ||
      inputValue.razonSocial == "" ||
      inputValue.municipio == "" ||
      inputValue.localidad == "" ||
      inputValue.estado == ""
    ) {
      toast({
        title: "Campos vacíos",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    const response = await axios.post("/api/users/admin/ventas", {
      Corral: corralSelected?.Id,
      Reemo: CorralInfo?.REEMO,
      Precio: inputValue.precioFinal,
      Psg: inputValue.psg,
      Nombre: inputValue.nombre,
      Razon: inputValue.razonSocial,
      Municipio: inputValue.municipio,
      Localidad: inputValue.localidad,
      Estado: inputValue.estado,
    });
    if (response.status == 200) {
      setLastId(response.data[0][0].LastId);
      toast({
        title: "Venta realizada",
        description: "La venta ha sido realizada correctamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: "No se pudo realizar la venta",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (lastId != 0) {
      setIsNotPrinting(false);
    }
  }, [lastId]);

  useEffect(() => {
    if (!isNotPrinting) {
      exportPDF();
      window.location.reload();
    }
  }, [isNotPrinting]);

  useEffect(() => {
    if (corralSelected != undefined) {
      getCorralVenta();
    }
  }, [corralSelected]);

  useEffect(() => {
    corralesOptions();
  }, []);

  return (
    <div className="h-[90vh] p-10 relative flex justify-center items-center">
      <SettingsModal />
      <div className="border-2 border-black w-[70%] min-h-[60%] h-auto max-h-[95%] overflow-y-auto rounded-md p-5">
        <p className="text-2xl font-bold text-center mb-2">
          {corralSelected
            ? `Corral ${corralSelected?.Corral} Motivo: ${CorralInfo?.Motivo}`
            : "Seleccione el corral a vender"}
        </p>
        {!isSelected && (
          <Select
            options={CorralesOptions}
            className="w-full border border-black rounded-md"
            onChange={handleSelectChange}
            instanceId="unique-select-id"
          />
        )}
        {corralSelected && (
          <div className="mt-5">
            {((isSacrificio && !isSelected) || !isSacrificio) &&
            corralSelected ? (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Inversión</th>
                      <th>Precio Sugerido</th>
                      <th>Ganancia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${CorralInfo?.Inversion}</td>
                      <td>${CorralInfo?.Precio}</td>
                      <td>${CorralInfo?.Ganancia}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              isSelected && (
                <p className="text-center text-2xl">
                  <strong>Total: </strong>${inputValue.precioFinal}
                </p>
              )
            )}
            {!isSelected && (
              <div>
                <p className="text-2xl font-bold text-center my-5">Animales</p>
                <div className="max-h-[30%] overflow-y-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Arete</th>
                        <th>Sexo</th>
                        <th>Meses</th>
                        <th>Clasificación</th>
                        <th>Corral</th>
                        <th>Peso</th>
                        <th>Precio de Compra</th>
                        {isSacrificio && <th>Precio Final</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {AnimalesCorral.map((animal) => (
                        <tr key={animal.Arete}>
                          <td>{animal.Arete}</td>
                          <td>{animal.Sexo}</td>
                          <td>{animal.Meses}</td>
                          <td>{animal.Clasificacion}</td>
                          <td>{animal.Corral}</td>
                          <td>{animal.Peso} Kg</td>
                          <td>${animal.PrecioCompra}</td>
                          {isSacrificio && (
                            <td>
                              <input
                                type="number"
                                className="border border-black py-1 px-2 rounded-md w-36"
                                defaultValue={animal.PrecioSugerido}
                                name={animal.Arete}
                                onChange={handlePrecioChange}
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5 w-full"
                  onClick={() => {
                    setisSelected(true);
                  }}
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        )}
        {isSelected && (
          <div className="mt-5 gap-5 flex flex-col">
            {!isSacrificio && (
              <div>
                <label
                  htmlFor=""
                  className="font-bold text-lg flex-grow text-left"
                >
                  Precio Final:
                </label>
                <input
                  type="number"
                  className="border border-black rounded-md w-full py-2 px-2"
                  placeholder="Ingrese el precio final de venta"
                  autoFocus
                  name="precioFinal"
                  defaultValue={CorralInfo?.PrecioNumber}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                PSG:
              </label>
              <input
                type="number"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese el PSG del ganadero"
                autoFocus
                name="psg"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                Nombre:
              </label>
              <input
                type="text"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese el nombre del ganadero"
                autoFocus
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                Razón Social:
              </label>
              <input
                type="text"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese la razón social"
                autoFocus
                name="razonSocial"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                Municipio:
              </label>
              <input
                type="text"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese el municipio"
                autoFocus
                name="municipio"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                Localidad:
              </label>
              <input
                type="text"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese la localidad"
                autoFocus
                name="localidad"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-bold text-lg flex-grow text-left"
              >
                Estado:
              </label>
              <input
                type="text"
                className="border border-black rounded-md w-full py-2 px-2"
                placeholder="Ingrese el estado"
                name="estado"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-5 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleVenta()}
                className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5"
              >
                Vender
              </button>
            </div>
          </div>
        )}
      </div>
      <PDFExport ref={pdfExportComponent} paperSize="Letter">
        <div className="p-7" hidden={isNotPrinting}>
          <div className="flex justify-center items-center w-full mb-10">
            <img src="/assets/Login/Logo.png" alt="LogoGanaderia" width={150} />
          </div>
          <div>
            <p className="text-center font-bold text-3xl py-3">
              Ganadería el Rosario
            </p>
            <p className="text-xl">
              <strong>Venta:</strong>
              {lastId}
            </p>
            <p className="text-xl">
              <strong>Motivo:</strong>
              {CorralInfo?.Motivo}
            </p>
            <p className="text-xl">
              <strong>PSG:</strong>
              {inputValue.psg}
            </p>
            <p className="text-xl">
              <strong>Nombre:</strong>
              {inputValue.nombre}
            </p>
            <p className="text-xl">
              <strong>Razon Social:</strong>
              {inputValue.razonSocial}
            </p>
            <p className="text-xl">
              <strong>Municipio:</strong>
              {inputValue.municipio}
            </p>
            <p className="text-xl">
              <strong>Localidad:</strong>
              {inputValue.localidad}
            </p>
            <p className="text-xl">
              <strong>Estado:</strong>
              {inputValue.estado}
            </p>
          </div>
          <table className="my-5">
            <thead>
              <tr>
                <th>Arete</th>
                <th>Sexo</th>
                <th>Meses</th>
                <th>Clas</th>
                {!isSacrificio && <th>Corral</th>}
                <th>Peso</th>
                {isSacrificio && <th>Precio Final</th>}
                {isSacrificio && <th>Precio por Kg</th>}
              </tr>
            </thead>
            <tbody>
              {AnimalesCorral.map((animal) => (
                <tr key={animal.Arete}>
                  <td>{animal.Arete}</td>
                  <td>{animal.Sexo}</td>
                  <td>{animal.Meses}</td>
                  <td>{animal.Clasificacion}</td>
                  {!isSacrificio && <td>{animal.Corral}</td>}
                  <td>{animal.Peso}</td>
                  {isSacrificio && <td>${inputPrecios[animal.Arete]}</td>}
                  {isSacrificio && (
                    <td>
                      $
                      {(
                        inputPrecios[animal.Arete] / Number(animal.Peso)
                      ).toFixed(2)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xl">
            <strong>Total:</strong> ${inputValue.precioFinal}
          </p>
        </div>
      </PDFExport>
    </div>
  );
}

export default VentasDashboard;